namespace Models.GPTModels
{
    public class CompletionTokensDetails
    {
        public int ReasoningTokens { get; set; }
        public int AcceptedPredictionTokens { get; set; }
        public int RejectedPredictionTokens { get; set; }
    }
}
