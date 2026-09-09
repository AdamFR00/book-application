namespace BookApi.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; } = null!;

        public string Author { get; set; } = null!;

        public int YearPublished {get; set;}

        public int UserId {get; set;}

        public User User {get; set;} = null!;

    }
}