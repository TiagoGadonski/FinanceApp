using Crud.Server.Data;
using Crud.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShoppingItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/shoppingitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingItem>>> GetShoppingItems()
        {
            return await _context.ShoppingItems
                .ToListAsync();
        }

        // GET: api/shoppingitems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingItem>> GetShoppingItem(int id)
        {
            var shoppingItem = await _context.ShoppingItems
                .FirstOrDefaultAsync(si => si.ItemId == id);

            if (shoppingItem == null)
            {
                return NotFound();
            }

            return shoppingItem;
        }

        // POST: api/shoppingitems
        [HttpPost]
        public async Task<ActionResult<ShoppingItem>> PostShoppingItem(ShoppingItem shoppingItem)
        {
            _context.ShoppingItems.Add(shoppingItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShoppingItem), new { id = shoppingItem.ItemId }, shoppingItem);
        }

        // PUT: api/shoppingitems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShoppingItem(int id, ShoppingItem shoppingItem)
        {
            if (id != shoppingItem.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(shoppingItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingItemExists(id))
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

        // DELETE: api/shoppingitems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShoppingItem(int id)
        {
            var shoppingItem = await _context.ShoppingItems.FindAsync(id);
            if (shoppingItem == null)
            {
                return NotFound();
            }

            _context.ShoppingItems.Remove(shoppingItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShoppingItemExists(int id)
        {
            return _context.ShoppingItems.Any(e => e.ItemId == id);
        }
    }
}
