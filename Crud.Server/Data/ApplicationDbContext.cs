using Crud.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace Crud.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<ShoppingItem> ShoppingItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TaskManager> TaskManagers { get; set; }
        public DbSet<SubTask> SubTasks { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Converter para armazenar a lista de tags como JSON no banco de dados
            var converter = new ValueConverter<List<string>, string>(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null));

            modelBuilder.Entity<Note>()
                .Property(e => e.Tags)
                .HasConversion(converter);
        }
    }
}
