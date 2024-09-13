export interface Transaction {
  transactionId: number;
  date: Date;  // Ou Date se você estiver usando objetos Date
  amount: number;
  description: string;
  categoryId: number;
  transactionType: string;
  paymentMethod: string;
  receiptImage: string;
  totalInstallments: number;
  installmentsPaid: number;
  installmentAmount: number;
  endDate: Date;  // Ou Date
  expenseType?: number;
  category?: {  // O tipo da categoria pode ser opcional caso não esteja sempre presente
    categoryId: number;
    name: string;
    description: string;
  };
}
