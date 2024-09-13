import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from '../../services/task-manager.service';
import { TaskManager } from '../../models/task-manager.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: TaskManager[] = [];

  constructor(private taskService: TaskManagerService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.checkDueDates();
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getTasks();  // Atualiza a lista de tarefas
    });
  }

  getTasksByStatus(status: string): TaskManager[] {
    return this.tasks.filter(task => task.status === status);  // Filtra tarefas com base no status
  }

  checkDueDates(): void {
    const today = new Date();
    this.tasks.forEach(task => {
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const timeDifference = dueDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Diferença em dias

        if (daysRemaining <= 3 && daysRemaining > 0) {
          this.toastService.showWarning(`A tarefa "${task.title}" está próxima da data limite!`, 'Aviso');
        } else if (daysRemaining < 0) {
          this.toastService.showError(`A tarefa "${task.title}" já venceu!`, 'Vencido');
        }
      }
    });
  }
}
