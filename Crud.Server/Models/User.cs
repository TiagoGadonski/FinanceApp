using System.ComponentModel.DataAnnotations;

namespace Crud.Server.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? ProfilePicture { get; set; }
        public DateTime LastLogin { get; set; }

        // Relacionamentos
        public virtual ICollection<Transaction> Transactions { get; set; }
        public virtual ICollection<ShoppingItem> ShoppingItems { get; set; }
        public virtual ICollection<Budget> Budgets { get; set; }
        public virtual ICollection<PaymentReminder> PaymentReminders { get; set; }

        public User()
        {
            Transactions = new HashSet<Transaction>();
            ShoppingItems = new HashSet<ShoppingItem>();
            Budgets = new HashSet<Budget>();
            PaymentReminders = new HashSet<PaymentReminder>();
        }

        // Métodos auxiliares
        public bool VerifyPassword(string password, string hash)
        {
            // Implementar a verificação de senha usando uma função de hash segura
            //return BCrypt.Net.BCrypt.Verify(password, hash);
            return true;
        }

        // Atualiza a data e hora do último login
        public void UpdateLastLogin(DateTime loginTime)
        {
            LastLogin = loginTime;
        }
    }
}
