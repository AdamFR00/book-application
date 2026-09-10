using System.ComponentModel.DataAnnotations;
namespace BookApi.DTOs.Auth
{
    public class LoginDto
    {
        [Required]
        public required string UserName { get; set; } = null!;

        [Required]
        public required string Password { get; set; } = null!;
    }
}