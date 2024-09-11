import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentReminderService } from '../../services/payment-reminder.service';
import { PaymentReminder } from '../../models/payment-reminder';

@Component({
  selector: 'app-payment-reminder-form',
  templateUrl: './payment-reminder-form.component.html',
  styleUrls: ['./payment-reminder-form.component.css']
})
export class PaymentReminderFormComponent implements OnInit {

  reminder: PaymentReminder = { reminderId: 0, dueDate: new Date(), amount: 0, description: '', isPaid: false };
  isEditMode = false;

  constructor(
    private reminderService: PaymentReminderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.reminderService.getPaymentReminder(+id).subscribe(reminder => {
        this.reminder = reminder;
      });
    }
  }

  saveReminder(): void {
    if (this.isEditMode) {
      this.reminderService.updatePaymentReminder(this.reminder.reminderId, this.reminder).subscribe(() => {
        this.router.navigate(['/paymentreminders']);
      });
    } else {
      this.reminderService.createPaymentReminder(this.reminder).subscribe(() => {
        this.router.navigate(['/paymentreminders']);
      });
    }
  }
}
