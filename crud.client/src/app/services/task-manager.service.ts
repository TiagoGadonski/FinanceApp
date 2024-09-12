import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskManager } from '../models/task-manager.model';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private apiUrl = 'https://localhost:7234/api/taskmanagers';  // URL do seu back-end

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskManager[]> {
    return this.http.get<TaskManager[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<TaskManager> {
    return this.http.get<TaskManager>(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskManager): Observable<TaskManager> {
    return this.http.post<TaskManager>(this.apiUrl, task);
  }

  updateTask(id: number, task: TaskManager): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
