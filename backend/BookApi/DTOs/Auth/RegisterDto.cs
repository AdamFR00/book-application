using System.ComponentModel.DataAnnotations;
namespace BookApi.DTOs.Auth
{
    public class RegisterDto
    {
        [Required]
        public string UserName {get; set;} = null!;
        
        [Required]
        public string Password {get; set;} = null!;
    }
}