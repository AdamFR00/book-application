namespace BookApi.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string UserName {get; set; } = null!;

        public string PasswordHash {get; set;} = null!;

        public ICollection<Book> Books {get; set; } = [];

        public ICollection<Quote> Quotes {get; set; } = [];
    }
}