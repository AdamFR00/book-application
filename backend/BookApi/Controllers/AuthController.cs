using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using BookApi.Data;
using BookApi.Models;
using BookApi.DTOs.Auth;
using Microsoft.AspNetCore.Identity;
using BookApi.Services;

namespace BookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController (
        AppDbContext context,
        IPasswordHasher<User> passwordHasher,
        JwtTokenService tokenProvider) : ControllerBase
    {
        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUser(RegisterDto request)
        {
            var usernameExists = await context.Users.AnyAsync(u => u.UserName == request.UserName);

            if(usernameExists)
            {
                return BadRequest("Username is already in use.");
            }

            var user = new User{
                UserName = request.UserName,
            };
            user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok("User registered!");
        }

        [HttpPost("login-user")]
        public async Task<IActionResult> LoginUser(LoginDto request)
        {
            User? user = await context.Users.FirstOrDefaultAsync(u => u.UserName == request.UserName);
            if(user == null)
            {
                return Unauthorized("Invalid username or password.");
            }
            PasswordVerificationResult verifyResult = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if(verifyResult == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid username or password");
                
            }
            string token = tokenProvider.Create(user);
            Response.Cookies.Append(
                "accessToken",
                token,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddDays(1)
                }
            );
            return Ok("Login successful.");
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken");
            return Ok();
        }
    }
}