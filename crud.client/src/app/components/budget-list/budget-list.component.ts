import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../models/budget';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {

  budgets: Budget[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budgetService.getBudgets().subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => {
      this.getBudgets();  // Recarregar a lista após excluir
    });
  }
}
