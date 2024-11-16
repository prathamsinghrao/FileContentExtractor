namespace Models
{
    public class ApiResponseModel<T>
    {
        public int StatusCode { get; set; }
        public string ErrorMessage { get; set; }
        public T Data { get; set; }
    }
    public static class ApiResponseExtensions
    {
        public static ApiResponseModel<T> CreateApiResponse<T>(this T data, int statusCode = 200, string errorMessage = null)
        {
            return new ApiResponseModel<T>
            {
                StatusCode = statusCode,
                ErrorMessage = errorMessage,
                Data = data
            };
        }
    }
}