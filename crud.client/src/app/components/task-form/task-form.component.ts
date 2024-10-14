import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from '../../services/task-manager.service';
import { TaskManager, PriorityLevel, TaskStatus } from '../../models/task-manager.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  task: TaskManager = {
    taskId: 0,
    title: '',
    description: '',
    dueDate: undefined,
    priority: PriorityLevel.Medium,
    status: TaskStatus.Pending,
    isReminderEnabled: false,
    tags: [],
    subTasks: [],
    attachments: []
  };

  isEditMode = false;
  TaskStatus = TaskStatus;
  PriorityLevel = PriorityLevel;
  newTag: string = '';

  constructor(
    private taskService: TaskManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskService.getTaskById(+id).subscribe(task => {
        this.task = task;
        if (!this.task.tags) {
          this.task.tags = [];
        }
      });
    } else {
      // Inicializar a lista de tags para uma nova tarefa
      if (!this.task.tags) {
        this.task.tags = [];
      }
    }
  }

  saveTask(): void {
    if (this.isEditMode) {
      this.taskService.updateTask(this.task.taskId, this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }

  addTag(event: Event): void {
    event.preventDefault();
    const tag = this.newTag.trim();
    console.log('Tentando adicionar tag:', tag);
    if (tag && !this.task.tags.includes(tag)) {
      this.task.tags.push(tag);
      console.log('Tag adicionada:', this.task.tags);
    }
    this.newTag = '';
  }

  removeTag(index: number): void {
    this.task.tags.splice(index, 1);
  }
}
