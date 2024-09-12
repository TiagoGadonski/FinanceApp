import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { ShoppingItemFormComponent } from './components/shopping-item-form/shopping-item-form.component';
import { ShoppingItemListComponent } from './components/shopping-item-list/shopping-item-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { HomeComponent } from './components/home/home.component';

// Definindo as rotas
const routes: Routes = [
  { path: 'budgets', component: BudgetListComponent },  // Lista de budgets
  { path: 'budgets/create', component: BudgetFormComponent },  // Criar novo budget
  { path: 'budgets/edit/:id', component: BudgetFormComponent },  // Editar budget
  // { path: '', redirectTo: '/users', pathMatch: 'full' },  // Comente temporariamente o redirecionamento
  // { path: '**', redirectTo: '/users' }  // Comente temporariamente o redirecionamento

  { path: 'shoppingitems', component: ShoppingItemListComponent },
  { path: 'shoppingitems/create', component: ShoppingItemFormComponent },
  { path: 'shoppingitems/edit/:id', component: ShoppingItemFormComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transactions/create', component: TransactionFormComponent },
  { path: 'transactions/edit/:id', component: TransactionFormComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/create', component: TaskFormComponent },
  { path: 'tasks/edit/:id', component: TaskFormComponent },
  { path: '', component: HomeComponent },  // Define a rota inicial como HomeComponent
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
