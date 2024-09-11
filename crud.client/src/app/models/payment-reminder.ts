export interface PaymentReminder {
  reminderId: number;
  dueDate: Date;
  amount: number;
  description: string;
  isPaid: boolean;
}
