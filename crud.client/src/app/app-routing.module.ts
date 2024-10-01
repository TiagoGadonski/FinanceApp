import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingItemFormComponent } from './components/shopping-item-form/shopping-item-form.component';
import { ShoppingItemListComponent } from './components/shopping-item-list/shopping-item-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { HomeComponent } from './components/home/home.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';

// Definindo as rotas
const routes: Routes = [
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
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/create', component: NoteFormComponent },
  { path: 'notes/edit/:id', component: NoteFormComponent },
  { path: '', component: HomeComponent },  // Define a rota inicial como HomeComponent
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
