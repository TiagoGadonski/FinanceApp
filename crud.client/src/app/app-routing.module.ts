import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';

// Definindo as rotas
const routes: Routes = [
  { path: 'users', component: UserListComponent },  // Lista de usuários
  { path: 'users/create', component: UserFormComponent },  // Criar novo usuário
  { path: 'users/edit/:id', component: UserFormComponent },  // Editar usuário
  { path: 'budgets', component: BudgetListComponent },  // Lista de budgets
  { path: 'budgets/create', component: BudgetFormComponent },  // Criar novo budget
  { path: 'budgets/edit/:id', component: BudgetFormComponent }  // Editar budget
  // { path: '', redirectTo: '/users', pathMatch: 'full' },  // Comente temporariamente o redirecionamento
  // { path: '**', redirectTo: '/users' }  // Comente temporariamente o redirecionamento
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
