using Crud.Server.Data;
using Crud.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Crud.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskManagersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskManagersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TaskManagers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskManager>>> GetTaskManagers()
        {
            return await _context.TaskManagers
                .Include(t => t.SubTasks)
                .Include(t => t.Attachments)
                .ToListAsync();
        }

        // GET: api/TaskManagers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskManager>> GetTaskManager(int id)
        {
            var taskManager = await _context.TaskManagers
                .Include(t => t.SubTasks)
                .Include(t => t.Attachments)
                .FirstOrDefaultAsync(t => t.TaskId == id);

            if (taskManager == null)
            {
                return NotFound();
            }

            return taskManager;
        }

        // POST: api/TaskManagers
        [HttpPost]
        public async Task<ActionResult<TaskManager>> PostTaskManager(TaskManager taskManager)
        {
            // Validar as Tags
            if (taskManager.Tags != null && taskManager.Tags.Any())
            {
                foreach (var tag in taskManager.Tags)
                {
                    if (string.IsNullOrEmpty(tag))
                    {
                        return BadRequest("Tag inválida.");
                    }
                }
            }

            _context.TaskManagers.Add(taskManager);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskManager), new { id = taskManager.TaskId }, taskManager);
        }

        // PUT: api/TaskManagers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskManager(int id, TaskManager taskManager)
        {
            if (id != taskManager.TaskId)
            {
                return BadRequest();
            }

            _context.Entry(taskManager).State = EntityState.Modified;

            // Atualizando SubTasks e Attachments
            var existingTask = await _context.TaskManagers
                .Include(t => t.SubTasks)
                .Include(t => t.Attachments)
                .FirstOrDefaultAsync(t => t.TaskId == id);

            if (existingTask == null)
            {
                return NotFound();
            }

            // Atualizando SubTasks
            existingTask.SubTasks.Clear();
            if (taskManager.SubTasks != null)
            {
                foreach (var subTask in taskManager.SubTasks)
                {
                    existingTask.SubTasks.Add(subTask);
                }
            }

            // Atualizando Attachments
            existingTask.Attachments.Clear();
            if (taskManager.Attachments != null)
            {
                foreach (var attachment in taskManager.Attachments)
                {
                    existingTask.Attachments.Add(attachment);
                }
            }

            // Atualizando outras propriedades
            existingTask.Title = taskManager.Title;
            existingTask.Description = taskManager.Description;
            existingTask.DueDate = taskManager.DueDate;
            existingTask.Priority = taskManager.Priority;
            existingTask.Status = taskManager.Status;
            existingTask.IsReminderEnabled = taskManager.IsReminderEnabled;
            existingTask.Tags = taskManager.Tags;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskManagerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/TaskManagers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskManager(int id)
        {
            var taskManager = await _context.TaskManagers
                .Include(t => t.SubTasks)
                .Include(t => t.Attachments)
                .FirstOrDefaultAsync(t => t.TaskId == id);

            if (taskManager == null)
            {
                return NotFound();
            }

            _context.SubTasks.RemoveRange(taskManager.SubTasks);
            _context.Attachments.RemoveRange(taskManager.Attachments);
            _context.TaskManagers.Remove(taskManager);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskManagerExists(int id)
        {
            return _context.TaskManagers.Any(e => e.TaskId == id);
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<TaskManager>>> GetUpcomingTasks()
        {
            var upcomingTasks = await _context.TaskManagers
                .Where(t => t.DueDate.HasValue && t.DueDate.Value >= DateTime.Now && t.DueDate.Value <= DateTime.Now.AddDays(7))
                .ToListAsync();

            return Ok(upcomingTasks);
        }
    }
}
