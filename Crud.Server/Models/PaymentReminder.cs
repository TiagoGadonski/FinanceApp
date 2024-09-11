using System.ComponentModel.DataAnnotations;

namespace Crud.Server.Models
{
    public class PaymentReminder
    {
        [Key]
        public int ReminderId { get; set; }
        public DateTime DueDate { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public bool IsPaid { get; set; }
        // Métodos auxiliares
        public void MarkAsPaid()
        {
            IsPaid = true;
        }

        public void UpdateReminderDetails(DateTime newDueDate, decimal newAmount, string newDescription)
        {
            DueDate = newDueDate;
            Amount = newAmount;
            Description = newDescription;
        }
    }
}
