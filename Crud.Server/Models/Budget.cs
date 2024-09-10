using System.ComponentModel.DataAnnotations;

namespace Crud.Server.Models
{
    public class Budget
    {
        [Key]
        public int BudgetId { get; set; }
        public int UserId { get; set; }
        public decimal Limit { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool NotificationsEnabled { get; set; }

        // Relacionamento
        public virtual User User { get; set; }

        // Métodos auxiliares
        public void UpdateBudget(decimal newLimit, DateTime newStartDate, DateTime newEndDate)
        {
            Limit = newLimit;
            StartDate = newStartDate;
            EndDate = newEndDate;
        }

        public void ToggleNotifications(bool enable)
        {
            NotificationsEnabled = enable;
        }
    }
}
