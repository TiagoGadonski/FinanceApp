﻿using Crud.Server.Data;
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
            var transactions = await _context.Transactions
                .Include(t => t.Category)
                .ToListAsync();

            // Retornar diretamente a lista de transações, sem incluir metadados como $id e $values
            return Ok(transactions);
        }

        // GET: api/transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions
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
            // Verificar se `CategoryId` é válido e carregar a entidade Category
            var category = await _context.Categories.FindAsync(transaction.CategoryId);
            if (category == null)
            {
                return BadRequest("Category not found.");
            }

            // Atribuir a categoria carregada à transação
            transaction.Category = category;

            // Adicionar e salvar a nova transação
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

        // GET: api/transactions/upcoming
        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetUpcomingTransactions()
        {
            var upcomingTransactions = await _context.Transactions
                .Where(t => t.Date >= DateTime.Now && t.Date <= DateTime.Now.AddDays(7))
                .ToListAsync();

            return Ok(upcomingTransactions);
        }
    }
}
