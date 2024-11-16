using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.GPTModels
{
    public class ChatRequest
    {
        public string Model { get; set; }
        public List<Message> Messages { get; set; }
        public double Temperature { get; set; }
    }
}
