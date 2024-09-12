import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response: any) => {
        if (response.$values) {
          this.transactions = response.$values; // Acessa o array dentro de $values
        } else {
          this.transactions = response; // Caso não tenha $values, atribui diretamente
        }
        console.log('Transações recebidas:', this.transactions);
      },
      error => {
        console.error('Erro ao carregar transações:', error);
      }
    );
    this.checkDueDates();
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
