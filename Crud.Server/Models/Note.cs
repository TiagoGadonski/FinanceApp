using System.ComponentModel.DataAnnotations;

namespace Crud.Server.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public List<string> Tags { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
