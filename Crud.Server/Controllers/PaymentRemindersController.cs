using Crud.Server.Data;
using Crud.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentRemindersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentRemindersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/paymentreminders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentReminder>>> GetPaymentReminders()
        {
            return await _context.PaymentReminders
                .Include(pr => pr.User)  // Incluir o relacionamento com o User
                .ToListAsync();
        }

        // GET: api/paymentreminders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentReminder>> GetPaymentReminder(int id)
        {
            var paymentReminder = await _context.PaymentReminders
                .Include(pr => pr.User)  // Incluir o relacionamento com o User
                .FirstOrDefaultAsync(pr => pr.ReminderId == id);

            if (paymentReminder == null)
            {
                return NotFound();
            }

            return paymentReminder;
        }

        // POST: api/paymentreminders
        [HttpPost]
        public async Task<ActionResult<PaymentReminder>> PostPaymentReminder(PaymentReminder paymentReminder)
        {
            _context.PaymentReminders.Add(paymentReminder);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPaymentReminder), new { id = paymentReminder.ReminderId }, paymentReminder);
        }

        // PUT: api/paymentreminders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentReminder(int id, PaymentReminder paymentReminder)
        {
            if (id != paymentReminder.ReminderId)
            {
                return BadRequest();
            }

            _context.Entry(paymentReminder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentReminderExists(id))
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

        // DELETE: api/paymentreminders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentReminder(int id)
        {
            var paymentReminder = await _context.PaymentReminders.FindAsync(id);
            if (paymentReminder == null)
            {
                return NotFound();
            }

            _context.PaymentReminders.Remove(paymentReminder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentReminderExists(int id)
        {
            return _context.PaymentReminders.Any(e => e.ReminderId == id);
        }
    }
}
