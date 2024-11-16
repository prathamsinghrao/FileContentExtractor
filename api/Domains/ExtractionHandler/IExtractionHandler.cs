using Models;

namespace Domains.ExtractionHandler
{
    public interface IExtractionHandler
    {
        Task<List<FileInfoViewModel>> ExtractFileContents(FileProcessingRequestModel fileProcessingRequest);
    }
}
