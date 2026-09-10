using BookApi.Data;
using BookApi.DTOs.Quotes;
using BookApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApi.Extensions;
namespace BookApi.Controllers
{
    [Authorize]
    [Route("/api/[controller]")]
    [ApiController]
    public class QuotesController(AppDbContext context) : ControllerBase
    {
        private const int MaxQuotesPerUser = 5;
        [HttpGet]
        public async Task<IActionResult> GetQuotes()
        {
            var userId = User.GetUserId();

            if(userId == null)
            {
                return Unauthorized();
            }
            var quotes = await context.Quotes
            .Where(q => q.UserId == userId)
            .Select(q => new QuoteDto
            {
                QuoteId = q.QuoteId,
                Content = q.Content
            }).ToListAsync();

            return Ok(quotes);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuote(int id)
        {
            var userId = User.GetUserId();

            if(userId == null)
            {
                return Unauthorized();
            }
            var quote = await context.Quotes.FirstOrDefaultAsync(q => q.UserId == userId && q.QuoteId == id);

            if(quote == null)
            {
                return NotFound($"Quote with {id} not found.");
            }

            QuoteDto result = new()
            {
                QuoteId = quote.QuoteId,
                Content = quote.Content
            };
            return Ok(result);

        }
        [HttpPost]
        public async Task<IActionResult> CreateQuote(CreateQuoteDto dto)
        {
            var userId = User.GetUserId();

            if(userId == null)
            {
                return Unauthorized();
            }
            int quoteCount = await context.Quotes.CountAsync(q => q.UserId == userId);

            if(quoteCount >= MaxQuotesPerUser)
            {
                return Conflict($"Maximum quote limit reached");
            }

            Quote quote = new ()
            {
                Content = dto.Content,
                UserId = userId.Value
            };

            context.Quotes.Add(quote);
            await context.SaveChangesAsync();

            QuoteDto createdQuote = new()
            {
                QuoteId = quote.QuoteId,
                Content = quote.Content
            };

            return CreatedAtAction(
                nameof(GetQuote),
                new {id = quote.QuoteId},
                createdQuote
            );
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuote(int id, UpdateQuoteDto dto)
        {
            var userId = User.GetUserId();

            if(userId == null)
            {
                return Unauthorized();
            }

            var quote = await context.Quotes.FirstOrDefaultAsync(q => q.UserId == userId && q.QuoteId == id);
            if(quote == null)
            {
                return NotFound($"Quote with id {id} not found.");
            }
            quote.Content = dto.Content;
            await context.SaveChangesAsync();

            QuoteDto result = new()
            {
                QuoteId = quote.QuoteId,
                Content = quote.Content
            };

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var userId = User.GetUserId();

            if(userId == null)
            {
                return Unauthorized();
            }
            var quote = await context.Quotes.FirstOrDefaultAsync(q => q.UserId == userId && q.QuoteId == id);

            if(quote == null)
            {
                return NotFound($"Quote with id {id} not found.");
            }
            context.Quotes.Remove(quote);

            await context.SaveChangesAsync();

            return NoContent();
        }
        
    }
}