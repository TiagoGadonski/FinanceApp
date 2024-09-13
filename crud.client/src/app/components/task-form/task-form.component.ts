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
      });
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
}
