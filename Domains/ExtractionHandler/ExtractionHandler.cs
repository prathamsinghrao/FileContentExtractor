using Microsoft.AspNetCore.Http;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using Models;
using PdfReader = iText.Kernel.Pdf.PdfReader;
using DocumentFormat.OpenXml.Packaging;

namespace Domains.ExtractionHandler
{
    public class ExtractionHandler : IExtractionHandler
    {
        public async Task<List<FileInfoViewModel>> ExtractFileContents(List<IFormFile> files)
        {
            List<FileInfoViewModel> response = new();
            if (files == null || files.Count == 0)
            {
                return response;
            }

            foreach (IFormFile file in files)
            {
                var supportedExtensions = new[] { ".pdf", ".txt", ".docx" };
                string fileExtension = Path.GetExtension(file.FileName).ToLower();

                if (!supportedExtensions.Contains(fileExtension)) { continue; }

                switch (fileExtension)
                {
                    case ".pdf":
                        await ExtractPdfFileContent(file, response);
                        break;
                    case ".docx":
                        await ExtractWordFileContent(file, response);
                        break;
                    case ".txt":
                        await ExtractTextFileContent(file, response);
                        break;
                }
            }

            return response;
        }

        private async Task ExtractPdfFileContent(IFormFile file, List<FileInfoViewModel> response)
        {
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Position = 0;

                using (var pdfReader = new PdfReader(stream))
                using (var pdfDocument = new PdfDocument(pdfReader))
                {
                    for (int i = 0; i < pdfDocument.GetNumberOfPages(); i++)
                    {
                        FileInfoViewModel fileInfo = new FileInfoViewModel
                        {
                            FileName = file.FileName
                        };
                        var page = pdfDocument.GetPage(i + 1);
                        var text = PdfTextExtractor.GetTextFromPage(page);
                        //var text = page.Contents.ToString(); // Extract content as string
                        fileInfo.PageNumber = i + 1; // Page numbers are 1-based
                        fileInfo.Content = text;
                        response.Add(fileInfo);
                    }
                }
            }
        }
        private async Task ExtractWordFileContent(IFormFile file, List<FileInfoViewModel> response)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyToAsync(stream).Wait();
                stream.Position = 0;

                using (var document = WordprocessingDocument.Open(stream, false))
                {
                    var body = document.MainDocumentPart.Document.Body;
                    var text = body.InnerText;

                    FileInfoViewModel fileInfo = new FileInfoViewModel
                    {
                        FileName = file.FileName,
                        Content = text,
                        PageNumber = 1 // Assuming all content is in one "page"
                    };
                    response.Add(fileInfo);
                }
            }
        }
        private async Task ExtractTextFileContent(IFormFile file, List<FileInfoViewModel> response)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyToAsync(stream).Wait();
                stream.Position = 0;

                using (var reader = new StreamReader(stream))
                {
                    var text = reader.ReadToEnd();

                    FileInfoViewModel fileInfo = new FileInfoViewModel
                    {
                        FileName = file.FileName,
                        Content = text,
                        PageNumber = 1 // Assuming all content is in one "page"
                    };
                    response.Add(fileInfo);
                }
            }
        }
    }
}
