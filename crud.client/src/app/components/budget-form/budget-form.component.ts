import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../models/budget';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {

  budget: Budget = { budgetId: 0, limit: 0, startDate: new Date(), endDate: new Date(), notificationsEnabled: false };
  isEditMode = false;

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.budgetService.getBudget(+id).subscribe(budget => {
        this.budget = budget;
      });
    }
  }

  saveBudget(): void {
    if (this.isEditMode) {
      this.budgetService.updateBudget(this.budget.budgetId, this.budget).subscribe(() => {
        this.router.navigate(['/budgets']);
      });
    } else {
      this.budgetService.createBudget(this.budget).subscribe(() => {
        this.router.navigate(['/budgets']);
      });
    }
  }
}
