import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';
import { ToastService } from '../../services/toast.service';
import { CategoryService } from '../../services/category.service';  // Adicionei o serviço de categorias
import { Category } from '../../models/category';
import { ExpenseType } from '../../models/ExpenseType';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  descriptionFilter: string = '';
  transactionTypeFilter: string = '';
  selectedCategoryId: number | null = null;
  installmentAmount: number = 0;
  categories: Category[] = [];
  selectedTransaction: Transaction | null = null;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,  // Adicionei o serviço de categorias
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getTransactions();
    this.getCategories();  // Chama o método para carregar as categorias
  }

  getExpenseTypeLabel(expenseType?: number): string {
    if (expenseType === undefined || expenseType === null) {
      return 'Unknown'; // Default label when `expenseType` is undefined or null
    }
    return ExpenseType[expenseType]; // This will map number to enum string
  }

  getTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response: any) => {
        this.transactions = response.$values || response; // Acessa o array dentro de $values se existir
        this.filteredTransactions = [...this.transactions]; // Inicializa com todas as transações
        this.calculateTotalMonthlyPayment();
        this.checkDueDates();
      },
      error => {
        console.error('Erro ao carregar transações:', error);
      }
    );
  }

  openTransactionModal(transaction: Transaction): void {
    this.selectedTransaction = transaction;

    // Get the modal element
    const modalElement = document.getElementById('transactionModal');

    // Initialize the Bootstrap modal
    const modal = new Modal(modalElement!);  // Using '!' to ensure the element is non-null
    modal.show();  // Show the modal
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      error => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter(transaction =>
      (this.descriptionFilter ? transaction.description.toLowerCase().includes(this.descriptionFilter.toLowerCase()) : true) &&
      (this.transactionTypeFilter ? transaction.transactionType.toLowerCase().includes(this.transactionTypeFilter.toLowerCase()) : true) &&
      (this.selectedCategoryId ? transaction.category?.categoryId === this.selectedCategoryId : true)
    );
    this.calculateTotalMonthlyPayment();
  }

  filterByCategory(event: Event): void {
    const categoryId = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId = categoryId ? +categoryId : null;
    this.applyFilters();
  }

  calculateTotalMonthlyPayment(): void {
    this.installmentAmount = this.filteredTransactions.reduce((total, transaction) => {
      return total + (transaction.installmentAmount || 0);
    }, 0);
  }

  deleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id).subscribe(() => {
      this.getTransactions();  // Recarregar a lista após a exclusão
    });
  }

  checkDueDates(): void {
    const today = new Date();
    this.transactions.forEach(transaction => {
      const dueDate = new Date(transaction.endDate);
      const timeDifference = dueDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if (daysRemaining <= 3 && daysRemaining > 0) {
        this.toastService.showWarning(`A transação "${transaction.description}" está próxima do vencimento!`, 'Aviso');
      } else if (daysRemaining < 0) {
        this.toastService.showError(`A transação "${transaction.description}" já venceu!`, 'Vencido');
      }
    });
  }
}
