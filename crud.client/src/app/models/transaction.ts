import { ExpenseType } from "./ExpenseType";

export interface Transaction {
  transactionId: number;
  date: Date;
  amount: number;
  description?: string;
  categoryId?: number;
  transactionType?: string;  // Receita ou Despesa
  paymentMethod?: string;
  receiptImage?: string;
  totalInstallments?: number;
  installmentsPaid?: number;
  installmentAmount?: number;
  endDate?: Date;
  expenseType: ExpenseType.Fixed// Fixa, Avulsa, Parcelada
}
