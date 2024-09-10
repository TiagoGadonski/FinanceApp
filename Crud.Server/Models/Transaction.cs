using System.ComponentModel.DataAnnotations;

namespace Crud.Server.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public string TransactionType { get; set; } // Receita ou Despesa
        public string PaymentMethod { get; set; }
        public string ReceiptImage { get; set; }
        public int? TotalInstallments { get; set; } // Total de parcelas, se aplicável
        public int? InstallmentsPaid { get; set; }  // Parcelas já pagas, se aplicável
        public decimal? InstallmentAmount { get; set; } // Valor de cada parcela, se aplicável
        public DateTime? EndDate { get; set; } // Data de término, se aplicável
        public ExpenseType ExpenseType { get; set; } // Tipo de despesa: Fixa, Avulsa, Parcelada
        public virtual Category Category { get; set; }
        public virtual User User { get; set; }

        public int InstallmentsRemaining => TotalInstallments.HasValue ? TotalInstallments.Value - InstallmentsPaid.Value : 0;

        public DateTime? CalculateEndDate()
        {
            if (Date != null && TotalInstallments.HasValue && InstallmentsPaid.HasValue)
            {
                return Date.AddMonths(TotalInstallments.Value - InstallmentsPaid.Value);
            }
            return null;
        }
    }

    public enum ExpenseType
    {
        Fixed,      // Despesa fixa
        Occasional, // Despesa avulsa
        Installment // Despesa parcelada
    }
}
