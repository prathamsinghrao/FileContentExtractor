using System.Text;
using System.Text.RegularExpressions;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;

using Domains.ChatGPTService;
using Domains.GeminiService;

using HtmlAgilityPack;

using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;

using Microsoft.AspNetCore.Http;

using Models;

using Newtonsoft.Json;

using Tesseract;

using PdfReader = iText.Kernel.Pdf.PdfReader;

namespace Domains.ExtractionHandler
{
    public class ExtractionHandler : IExtractionHandler
    {
        public async Task<List<FileInfoViewModel>> ExtractFileContents(FileProcessingRequestModel fileProcessingRequest)
        {
            List<FileInfoViewModel> response = new();
            var files = fileProcessingRequest.Files;
            if (files == null || files.Count == 0)
            {
                return response;
            }

            List<UserKeyFields> userKeys = !string.IsNullOrWhiteSpace(fileProcessingRequest.UserKeys) ? JsonConvert.DeserializeObject<List<UserKeyFields>>(fileProcessingRequest.UserKeys) : new();

            foreach (IFormFile file in files)
            {
                var supportedExtensions = new[] { ".pdf", ".txt", ".docx", ".pptx", ".jpg", ".jpeg", ".png", ".html" };
                string fileExtension = Path.GetExtension(file.FileName).ToLower();

                if (!supportedExtensions.Contains(fileExtension)) { continue; }

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    stream.Position = 0;
                    switch (fileExtension)
                    {
                        case ".pdf":
                            await ExtractPdfFileContent(file.FileName, stream, response, userKeys);
                            break;
                        case ".docx":
                            await ExtractWordFileContent(file.FileName, stream, response);
                            break;
                        case ".txt":
                            await ExtractTextFileContent(file.FileName, stream, response);
                            break;
                        case ".pptx":
                            await ExtractPptxFileContent(file.FileName, stream, response);
                            break;
                        case ".html":
                            await ExtractHtmlFileContent(file.FileName, stream, response);
                            break;
                        case ".jpg" or ".png" or ".jpeg":
                            await ExtractImageFileContent(file.FileName, stream, response);
                            break;
                    }
                }
            }

            return response;
        }
        private async Task ExtractPdfFileContent(string fileName, MemoryStream stream, List<FileInfoViewModel> response, List<UserKeyFields> userKeys)
        {
            using (var pdfReader = new PdfReader(stream))
            using (var pdfDocument = new PdfDocument(pdfReader))
            {
                //Bind extracted text in response
                StringBuilder extractedData = new StringBuilder();
                for (int i = 0; i < pdfDocument.GetNumberOfPages(); i++)
                {
                    FileInfoViewModel fileInfo = new FileInfoViewModel
                    {
                        FileName = fileName
                    };
                    var page = pdfDocument.GetPage(i + 1);
                    var text = PdfTextExtractor.GetTextFromPage(page);

                    fileInfo.PageNumber = i + 1;
                    fileInfo.Content = CleanUpText(text);
                    extractedData.AppendLine(text);
                    response.Add(fileInfo);
                }

                //Get structured data from the extracted text
                string structuredData = await GetStructuredData(extractedData.ToString(), userKeys);
                if (!string.IsNullOrWhiteSpace(structuredData))
                {
                    response.Add(new FileInfoViewModel
                    {
                        Content = structuredData,
                        FileName = fileName,
                        PageNumber = 1
                    });
                }
            }
        }
        private string CleanUpText(string extractedText)
        {
            // Remove duplicate characters
            return Regex.Replace(extractedText, @"(.)\1+", "$1");
        }
        private async Task ExtractWordFileContent(string fileName, MemoryStream stream, List<FileInfoViewModel> response)
        {
            using (var document = WordprocessingDocument.Open(stream, false))
            {
                var body = document.MainDocumentPart.Document.Body;
                var text = body.InnerText;

                FileInfoViewModel fileInfo = new FileInfoViewModel
                {
                    FileName = fileName,
                    Content = text,
                    PageNumber = 1
                };
                response.Add(fileInfo);
            }
        }
        private async Task ExtractTextFileContent(string fileName, MemoryStream stream, List<FileInfoViewModel> response)
        {
            using (var reader = new StreamReader(stream))
            {
                var text = reader.ReadToEnd();

                FileInfoViewModel fileInfo = new FileInfoViewModel
                {
                    FileName = fileName,
                    Content = text,
                    PageNumber = 1
                };
                response.Add(fileInfo);
            }
        }
        private async Task ExtractPptxFileContent(string fileName, MemoryStream stream, List<FileInfoViewModel> response)
        {
            using (PresentationDocument presentationDocument = PresentationDocument.Open(stream, false))
            {
                var slideIdList = presentationDocument.PresentationPart.Presentation.SlideIdList;
                int pageNumber = 1;

                foreach (var slideId in slideIdList.Elements<SlideId>())
                {
                    var slidePart = (SlidePart)presentationDocument.PresentationPart.GetPartById(slideId.RelationshipId);
                    var text = ExtractTextFromSlide(slidePart);

                    var fileInfo = new FileInfoViewModel
                    {
                        FileName = fileName,
                        Content = text,
                        PageNumber = pageNumber++
                    };

                    response.Add(fileInfo);
                }
            }
        }
        private string ExtractTextFromSlide(SlidePart slidePart)
        {
            var textBuilder = new StringBuilder();

            foreach (var textBody in slidePart.Slide.Descendants<DocumentFormat.OpenXml.Drawing.Text>())
            {
                textBuilder.AppendLine(textBody.Text);
            }

            return textBuilder.ToString();
        }
        private async Task ExtractImageFileContent(string fileName, MemoryStream stream, List<FileInfoViewModel> response)
        {
            var pix = Pix.LoadFromMemory(stream.ToArray());
            using (var engine = new TesseractEngine(@"./tessdata", "eng", EngineMode.Default))
            {
                using (var page = engine.Process(pix))
                {
                    FileInfoViewModel fileInfo = new FileInfoViewModel
                    {
                        FileName = fileName,
                        Content = page.GetText(),
                        PageNumber = 1
                    };
                    response.Add(fileInfo);
                }
            }
        }
        private async Task ExtractHtmlFileContent(string fileName, MemoryStream stream, List<FileInfoViewModel> response)
        {
            string htmlContent;
            using (var reader = new StreamReader(stream))
            {
                htmlContent = await reader.ReadToEndAsync();
            }

            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(htmlContent);

            string textContent = htmlDocument.DocumentNode.InnerText;

            FileInfoViewModel fileInfo = new FileInfoViewModel
            {
                FileName = fileName,
                Content = textContent,
                PageNumber = 1
            };

            response.Add(fileInfo);
        }
        private async Task<string> GetStructuredData(string extractedText, List<UserKeyFields> userKeys)
        {
            // Start building the dynamic prompt
            StringBuilder promptBuilder = new StringBuilder();

            promptBuilder.AppendLine("I will provide you with a text and a list of keys. Please extract the information related to these keys from the text.");
            promptBuilder.AppendLine("Each key has a type, description, and possibly an example to guide the extraction.");
            promptBuilder.AppendLine("Please return the extracted information in a JSON format, where each key is a property, and the extracted value is the corresponding value for that property.");

            foreach (var key in userKeys)
            {
                promptBuilder.AppendLine($"\nKey: {key.Key}");
                promptBuilder.AppendLine($"Type: {key.Type}");
                promptBuilder.AppendLine($"Description: {key.Description}");

                if (!string.IsNullOrEmpty(key.Example))
                {
                    promptBuilder.AppendLine($"Example: {key.Example}");
                }

                promptBuilder.AppendLine($"Please extract the {key.Type} value for '{key.Key}' from the following text.");
            }

            promptBuilder.AppendLine("\nHere is the text from which you need to extract the information:");
            promptBuilder.AppendLine(extractedText);
            promptBuilder.AppendLine("\nReturn the extracted information as a JSON object");

            promptBuilder.AppendLine(@"
            {
                'name': 'John Doe',
                'birthdate': 'July 10, 1990'
            }");

            string prompt = promptBuilder.ToString();


            //ChatGPT Wrapper (https://platform.openai.com/)
            //return await new ChatGPTServiceDomain("##ENTER YOUR APIKEY##").GetChatGPTResponse(prompt);

            //Gemini Wrapper (https://aistudio.google.com/)
            return await new GeminiServiceDomain("AIzaSyAFnORtQkupuyGJmDMhu02oI0875vwxjwQ").GetGeminiResponse(prompt);
        }
    }
}
