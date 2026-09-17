using BookApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApi.Extensions;
using BookApi.DTOs.Books;
using BookApi.Models;

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

            var userId = User.GetUserId();

            if (userId == null)
            {
                return Unauthorized();
            }
            var books = await context.Books.
            Where(b => b.UserId == userId)
            .Select(b => new BookDto
            {
                BookId = b.BookId,
                Title = b.Title,
                Author = b.Author,
                YearPublished = b.YearPublished
            }).ToListAsync();

            return Ok(books);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var userId = User.GetUserId();

            if (userId == null)
            {
                return Unauthorized();
            }
            var book = await context.Books.FirstOrDefaultAsync(b => b.UserId == userId && b.BookId == id);

            if (book == null)
            {
                return NotFound($"Book with {id} not found.");
            }

            return Ok(new BookDto
            {
                BookId = book.BookId,
                Title = book.Title,
                Author = book.Author,
                YearPublished = book.YearPublished
            });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var userId = User.GetUserId();

            if (userId == null)
            {
                return Unauthorized();
            }
            var book = await context.Books.FirstOrDefaultAsync(b => b.UserId == userId && b.BookId == id);

            if (book == null)
            {
                return NotFound($"Book with {id} not found.");
            }
            context.Books.Remove(book);

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, UpdateBookDto dto)
        {
            var userId = User.GetUserId();

            if (userId == null)
            {
                return Unauthorized();
            }
            var book = await context.Books.FirstOrDefaultAsync(b => b.UserId == userId && b.BookId == id);

            if (book == null)
            {
                return NotFound($"Book with {id} not found.");
            }

            book.Title = dto.Title;
            book.Author = dto.Author;
            book.YearPublished = dto.YearPublished;

            await context.SaveChangesAsync();

            BookDto result = new()
            {
                BookId = book.BookId,
                Title = book.Title,
                Author = book.Author,
                YearPublished = book.YearPublished
            };

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook(CreateBookDto dto)
        {
            var userId = User.GetUserId();

            if (userId == null)
            {
                return Unauthorized();
            }

            var exists = await context.Books.AnyAsync(b =>
                b.UserId == userId.Value &&
                b.Title.ToLower() == dto.Title.ToLower() &&
                b.Author.ToLower() == dto.Author.ToLower()
            );
            if (exists)
            {
                return Conflict("This book has already been added");
            }
            Book book = new()
            {
                Title = dto.Title,
                Author = dto.Author,
                YearPublished = dto.YearPublished,
                UserId = userId.Value
            };
            context.Books.Add(book);
            await context.SaveChangesAsync();

            BookDto result = new()
            {
                BookId = book.BookId,
                Title = book.Title,
                Author = book.Author,
                YearPublished = book.YearPublished
            };

            return CreatedAtAction(
                nameof(GetBook),
                new { id = book.BookId },
                result
            );
        }

    }
}