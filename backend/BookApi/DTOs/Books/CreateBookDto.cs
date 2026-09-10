using System.ComponentModel.DataAnnotations;
namespace BookApi.DTOs.Books
{
    public class CreateBookDto
    {
        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string Author {get; set;} = null!;

        [Required]
        [Range(1, int.MaxValue)]
        public int YearPublished {get; set;}
    }
}