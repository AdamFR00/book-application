using System.Reflection.Metadata;

namespace BookApi.Models
{
    public class Quote
    {
        public int QuoteId { get; set; }
        public string Content {get; set;} = null!;
        public int UserId {get; set;}
        public User User {get; set;} = null!; 
    }
}