import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { PaymentReminderListComponent } from './components/payment-reminder-list/payment-reminder-list.component';
import { PaymentReminderFormComponent } from './components/payment-reminder-form/payment-reminder-form.component';
import { ShoppingItemListComponent } from './components/shopping-item-list/shopping-item-list.component';
import { ShoppingItemFormComponent } from './components/shopping-item-form/shopping-item-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';  // Adicione essa linha


@NgModule({
  declarations: [
    AppComponent,
    BudgetListComponent,
    BudgetFormComponent,
    PaymentReminderListComponent,
    PaymentReminderFormComponent,
    ShoppingItemListComponent,
    ShoppingItemFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
    TransactionListComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
