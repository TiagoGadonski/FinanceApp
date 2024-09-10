export interface Budget {
  budgetId: number;
  userId: number;
  limit: number;
  startDate: Date;
  endDate: Date;
  notificationsEnabled: boolean;
}
