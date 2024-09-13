export interface TaskManager {
  taskId: number;
  title: string;
  description: string;
  dueDate?: Date;
  priority: PriorityLevel;
  status: TaskStatus;
  isReminderEnabled: boolean;
  tags: string[];
  subTasks: SubTask[];
  attachments: Attachment[];
}

export interface SubTask {
  subTaskId: number;
  title: string;
  isCompleted: boolean;
}

export interface Attachment {
  attachmentId: number;
  filePath: string;
  description: string;
}

export enum PriorityLevel {
  High = 0,
  Medium = 1,
  Low = 2
}

export enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Canceled = 'Canceled'
}
