using System.ComponentModel.DataAnnotations;
namespace BookApi.DTOs.Quotes
{
    public class CreateQuoteDto
    {
        [Required]
        public string Content { get; set; } = null!;
    }
}