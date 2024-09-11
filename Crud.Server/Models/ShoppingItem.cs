using System.ComponentModel.DataAnnotations;

namespace Crud.Server.Models
{
    public class ShoppingItem
    {
        [Key]
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public bool IsPurchased { get; set; }
        public string? Link { get; set; }
        public string? Image { get; set; }
        public string? Priority { get; set; }
        // Relacionamento
        public void MarkAsPurchased()
        {
            IsPurchased = true;
        }

        public void UpdateItemDetails(string newName, int newQuantity, decimal newPrice)
        {
            Name = newName;
            Quantity = newQuantity;
            Price = newPrice;
        }
    }
}
