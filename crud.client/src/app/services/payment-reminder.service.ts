import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentReminder } from '../models/payment-reminder';

@Injectable({
  providedIn: 'root'
})
export class PaymentReminderService {

  private apiUrl = 'https://localhost:7234/api/paymentreminders';

  constructor(private http: HttpClient) { }

  getPaymentReminders(): Observable<PaymentReminder[]> {
    return this.http.get<PaymentReminder[]>(this.apiUrl);
  }

  getPaymentReminder(id: number): Observable<PaymentReminder> {
    return this.http.get<PaymentReminder>(`${this.apiUrl}/${id}`);
  }

  createPaymentReminder(reminder: PaymentReminder): Observable<PaymentReminder> {
    return this.http.post<PaymentReminder>(this.apiUrl, reminder);
  }

  updatePaymentReminder(id: number, reminder: PaymentReminder): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reminder);
  }

  deletePaymentReminder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
