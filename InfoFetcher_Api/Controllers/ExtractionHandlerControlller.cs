using Domains.ExtractionHandler;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace InfoFetcher_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtractionHandlerControlller : ControllerBase
    {
        private readonly IExtractionHandler _extractionHandler;
        public ExtractionHandlerControlller(IExtractionHandler extractionHandler)
        {
            _extractionHandler = extractionHandler;
        }

        [HttpPost]
        [Route("extract-content")]
        public async Task<ApiResponseModel<List<FileInfoViewModel>>> ProcessFile(List<IFormFile> files)
        {
            List<FileInfoViewModel> response = await _extractionHandler.ExtractFileContents(files);
            return response.CreateApiResponse();
        }
    }
}
