using BookApi.Data;
using BookApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("test")]
        public async Task<IActionResult> TestRelationship()
        {
            var user = new User
            {
                Email = "Test@example.com"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var book = new Book
            {
                Title = "Dune",
                Author = "Frank Herbert",
                YearPublished = 1965,
                UserId = user.UserId
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            var savedBook = await _context.Books
            .Include(b => b.User)
            .FirstAsync(b => b.BookId == book.BookId);

            return Ok(new
            {
                savedBook.BookId,
                savedBook.Title,
                savedBook.UserId,
                UserEmail = savedBook.User.Email
            });


        }
    }
}