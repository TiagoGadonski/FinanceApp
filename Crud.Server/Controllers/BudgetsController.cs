using Crud.Server.Data;
using Crud.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BudgetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/budgets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetBudgets()
        {
            return await _context.Budgets
                .Include(b => b.User) // Incluir o relacionamento com User
                .ToListAsync();
        }

        // GET: api/budgets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetBudget(int id)
        {
            var budget = await _context.Budgets
                .Include(b => b.User) // Incluir o relacionamento com User
                .FirstOrDefaultAsync(b => b.BudgetId == id);

            if (budget == null)
            {
                return NotFound();
            }

            return budget;
        }

        // POST: api/budgets
        [HttpPost]
        public async Task<ActionResult<Budget>> PostBudget(Budget budget)
        {
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBudget), new { id = budget.BudgetId }, budget);
        }

        // PUT: api/budgets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBudget(int id, Budget budget)
        {
            if (id != budget.BudgetId)
            {
                return BadRequest();
            }

            _context.Entry(budget).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BudgetExists(id))
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

        // DELETE: api/budgets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget == null)
            {
                return NotFound();
            }

            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BudgetExists(int id)
        {
            return _context.Budgets.Any(e => e.BudgetId == id);
        }
    }
}
