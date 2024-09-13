using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Crud.Server.Models
{
    public class TaskManager
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? DueDate { get; set; }  // Data limite para a tarefa

        public PriorityLevel Priority { get; set; }  // Nível de prioridade: Alta, Média, Baixa

        public TaskStatus Status { get; set; }  // Status: Pendente, Em andamento, Concluída, Cancelada

        public bool IsReminderEnabled { get; set; }  // Ativar lembrete para a tarefa

        public List<string> Tags { get; set; }  // Rótulos ou categorias da tarefa

        public List<SubTask> SubTasks { get; set; }  // Lista de subtarefas

        public List<Attachment> Attachments { get; set; }  // Lista de arquivos ou links anexados

        public TaskManager()
        {
            SubTasks = new List<SubTask>();
            Attachments = new List<Attachment>();
            Tags = new List<string>();
        }

        // Métodos auxiliares

        public void MarkAsCompleted()
        {
            Status = TaskStatus.Completed;
        }

        public void UpdateTaskDetails(string newTitle, string newDescription, DateTime? newDueDate, PriorityLevel newPriority)
        {
            Title = newTitle;
            Description = newDescription;
            DueDate = newDueDate;
            Priority = newPriority;
        }
    }

    // Classe auxiliar para sub-tarefas
    public class SubTask
    {
        [Key]
        public int SubTaskId { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }

        public void MarkAsCompleted()
        {
            IsCompleted = true;
        }
    }

    // Classe auxiliar para anexos
    public class Attachment
    {
        [Key]
        public int AttachmentId { get; set; }
        public string FilePath { get; set; }  // Caminho ou link do arquivo
        public string Description { get; set; }
    }

    // Enum para priorizar tarefas
    public enum PriorityLevel
    {
        High,
        Medium,
        Low
    }

    // Enum para status de tarefas
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskStatus
    {
        Pending,
        InProgress,
        Completed,
        Canceled
    }
}
