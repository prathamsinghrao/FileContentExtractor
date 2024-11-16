using Models.GPTModels;

using RestSharp;

namespace Domains.ChatGPTService
{
    public class ChatGPTServiceDomain
    {
        private readonly string _apiKey;
        private readonly string _baseURL;
        public ChatGPTServiceDomain(string apiKey)
        {
            _apiKey = apiKey;
            _baseURL = "https://api.openai.com/v1";
        }

        public async Task<string> GetChatGPTResponse(string prompt)
        {
            RestClient client = new RestClient(_baseURL);
            RestRequest request = new RestRequest("chat/completions", Method.Post);
            request.AddHeader("Authorization", $"Bearer {_apiKey}");
            request.AddHeader("Content-Type", "application/json");

            var requestBody = new ChatRequest
            {
                Model = "gpt-3.5-turbo", //Model we are going to use
                Messages = new List<Message>
                {
                    new Message { Role = "user", Content = prompt }
                },
                Temperature = 0.7
            };

            request.AddJsonBody(requestBody);

            var response = await client.ExecuteAsync<ChatResponse>(request);

            if (response.IsSuccessful)
            {
                if (response.Data != null && response.Data.Choices.Count > 0)
                {
                    return response.Data.Choices[0].Message.Content;
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
    }
}
