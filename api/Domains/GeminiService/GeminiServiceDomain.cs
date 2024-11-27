using RestSharp;

namespace Domains.GeminiService
{
    public class GeminiServiceDomain
    {
        private readonly string _apiKey;
        public GeminiServiceDomain(string apiKey)
        {
            _apiKey = apiKey;
        }

        public async Task<string> GetGeminiResponse(string prompt)
        {
            try
            {
                var client = new RestClient($"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={_apiKey}");

                var request = new RestRequest();
                request.Method = Method.Post;
                request.AddJsonBody(new { contents = new[] { new { parts = new[] { new { text = prompt } } } } });

                var response = await client.ExecuteAsync<GeminiChatResponse>(request);
                if (response.IsSuccessful)
                {
                    bool isContentRuturned = response.Data.candidates != null && response.Data.candidates.Count > 0 && response.Data.candidates[0].content != null && response.Data.candidates[0].content.parts.Count > 0;
                    if (isContentRuturned)
                    {
                        return response.Data.candidates[0].content.parts[0].text;
                    }
                    else
                    {
                        return "No content returned!";
                    }
                }
                else
                {
                    return $"Error: {response.StatusCode} - {response.ErrorMessage}";
                }
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }
    }
    public class Candidate
    {
        public Content content { get; set; }
        public string finishReason { get; set; }
        public double avgLogprobs { get; set; }
    }

    public class Content
    {
        public List<Part> parts { get; set; }
        public string role { get; set; }
    }

    public class Part
    {
        public string text { get; set; }
    }

    public class GeminiChatResponse
    {
        public List<Candidate> candidates { get; set; }
        public UsageMetadata usageMetadata { get; set; }
        public string modelVersion { get; set; }
    }

    public class UsageMetadata
    {
        public int promptTokenCount { get; set; }
        public int candidatesTokenCount { get; set; }
        public int totalTokenCount { get; set; }
    }
}