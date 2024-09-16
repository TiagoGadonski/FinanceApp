import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';
import { TaskManagerService } from '../../services/task-manager.service';
import { TaskManager } from '../../models/task-manager.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  upcomingTransactions: Transaction[] = [];
  upcomingTasks: TaskManager[] = [];

  constructor(
    private transactionService: TransactionService,
    private taskManagerService: TaskManagerService
  ) { }

  ngOnInit(): void {
    this.loadUpcomingTransactions();
    this.loadUpcomingTasks();
  }

  loadUpcomingTransactions(): void {
    this.transactionService.getUpcomingTransactions().subscribe(transactions => {
      this.upcomingTransactions = transactions;
    });
  }

  loadUpcomingTasks(): void {
    this.taskManagerService.getUpcomingTasks().subscribe(tasks => {
      this.upcomingTasks = tasks;
    });
  }
}