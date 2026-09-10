using System.Security.Claims;
using System.Threading.Tasks;
using BookApi.Data;
using BookApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }
            var books = await context.Books.Where(b => b.UserId == userId).ToListAsync();

            return Ok(books);
        }
    }
}