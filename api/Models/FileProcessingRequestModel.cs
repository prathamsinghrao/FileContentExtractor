using Microsoft.AspNetCore.Http;

namespace Models
{
    public class FileProcessingRequestModel
    {
        public List<IFormFile> Files { get; set; }
        public string UserKeys { get; set; }
    }

    public class UserKeyFields
    {
        public string Key { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string? Example { get; set; }
    }
}
