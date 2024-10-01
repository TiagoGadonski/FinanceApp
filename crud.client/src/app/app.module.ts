import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ShoppingItemListComponent } from './components/shopping-item-list/shopping-item-list.component';
import { ShoppingItemFormComponent } from './components/shopping-item-form/shopping-item-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';  // Adicione essa linha

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteFormComponent } from './components/note-form/note-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingItemListComponent,
    ShoppingItemFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    TransactionListComponent,
    TransactionFormComponent,
    TaskListComponent,
    TaskFormComponent,
    HomeComponent,
    NoteListComponent,
    NoteFormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule,
    BrowserAnimationsModule, // Necessário para animações
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
