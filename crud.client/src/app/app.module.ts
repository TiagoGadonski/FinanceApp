import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';  // Adicione essa linha


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    BudgetListComponent,
    BudgetFormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
