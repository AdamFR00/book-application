namespace BookApi.DTOs.Books
{
    public class BookDto
    {
        public int BookId { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public int YearPublished { get; set; }
    }
}