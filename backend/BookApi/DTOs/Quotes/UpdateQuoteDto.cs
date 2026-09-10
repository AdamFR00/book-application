using System.ComponentModel.DataAnnotations;
namespace BookApi.DTOs.Quotes
{
    public class UpdateQuoteDto
    {
        [Required]
        public string Content {get; set;} = null!;
    }
}