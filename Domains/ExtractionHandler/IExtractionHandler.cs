using Microsoft.AspNetCore.Http;

using Models;

namespace Domains.ExtractionHandler
{
    public interface IExtractionHandler
    {
        Task<List<FileInfoViewModel>> ExtractFileContents(List<IFormFile> files);
    }
}
