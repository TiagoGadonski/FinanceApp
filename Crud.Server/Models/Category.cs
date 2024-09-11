using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Crud.Server.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // Relacionamentos
        [JsonIgnore]
        public virtual ICollection<Transaction> Transactions { get; set; }

        public Category()
        {
            Transactions = new HashSet<Transaction>();
        }

        // Métodos auxiliares
        public void UpdateCategoryDetails(string newName, string newDescription)
        {
            Name = newName;
            Description = newDescription;
        }
    }
}
