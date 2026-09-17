namespace BookApi.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string UserName { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;
    }
}