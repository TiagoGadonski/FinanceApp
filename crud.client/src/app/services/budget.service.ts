import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private apiUrl = 'https://localhost:7234/api/budgets';

  constructor(private http: HttpClient) { }

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl);
  }

  getBudget(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${id}`);
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budget);
  }

  updateBudget(id: number, budget: Budget): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, budget);
  }

  deleteBudget(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
