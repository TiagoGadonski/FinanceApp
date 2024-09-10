using Crud.Server.Data;
using Crud.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions
                .Include(t => t.User)       // Inclui o relacionamento com User
                .Include(t => t.Category)   // Inclui o relacionamento com Category
                .ToListAsync();
        }

        // GET: api/transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions
                .Include(t => t.User)       // Inclui o relacionamento com User
                .Include(t => t.Category)   // Inclui o relacionamento com Category
                .FirstOrDefaultAsync(t => t.TransactionId == id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // POST: api/transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
            // Verifica se a categoria e o usuário associados existem
            var user = await _context.Users.FindAsync(transaction.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var category = await _context.Categories.FindAsync(transaction.CategoryId);
            if (category == null)
            {
                return BadRequest("Category not found.");
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.TransactionId }, transaction);
        }

        // PUT: api/transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, Transaction transaction)
        {
            if (id != transaction.TransactionId)
            {
                return BadRequest();
            }

            // Verifica se a categoria e o usuário associados existem
            var user = await _context.Users.FindAsync(transaction.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var category = await _context.Categories.FindAsync(transaction.CategoryId);
            if (category == null)
            {
                return BadRequest("Category not found.");
            }

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.TransactionId == id);
        }
    }
}
