import { Component, OnInit } from '@angular/core';
import { PaymentReminderService } from '../../services/payment-reminder.service';
import { PaymentReminder } from '../../models/payment-reminder';

@Component({
  selector: 'app-payment-reminder-list',
  templateUrl: './payment-reminder-list.component.html',
  styleUrls: ['./payment-reminder-list.component.css']
})
export class PaymentReminderListComponent implements OnInit {

  paymentReminders: PaymentReminder[] = [];

  constructor(private reminderService: PaymentReminderService) { }

  ngOnInit(): void {
    this.getPaymentReminders();
  }

  getPaymentReminders(): void {
    this.reminderService.getPaymentReminders().subscribe(reminders => {
      this.paymentReminders = reminders;
    });
  }

  deleteReminder(id: number): void {
    this.reminderService.deletePaymentReminder(id).subscribe(() => {
      this.getPaymentReminders();  // Recarregar a lista após a exclusão
    });
  }
}
