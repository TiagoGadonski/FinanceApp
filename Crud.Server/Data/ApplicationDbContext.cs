using Crud.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Crud.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<ShoppingItem> ShoppingItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<PaymentReminder> PaymentReminders { get; set; }
    }
}
