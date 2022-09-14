import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';

import { FlexLayoutModule } from '@angular/flex-layout';


import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './page/home/home.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AboutComponent } from './page/about/about.component';
import { HelpComponent } from './page/help/help.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { CalendarComponent } from './page/calendar/calendar.component';
import { IncomesComponent } from './page/incomes/incomes.component';
import { ExpensesComponent } from './page/expenses/expenses.component';
import { ChartsComponent } from './page/charts/charts.component';

import { AddExpensesComponent } from './popup/expenses/addExpenses.component';
import { AddIncomesComponent } from './popup/incomes/addIncomes.component';
import { AddEventComponent } from './popup/event/addEvent.component';

import { UpdateEventComponent } from './popup/event/updateEvent.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgChartsModule } from 'ng2-charts';
import { SetIncomeComponent } from './popup/incomes/setIncome.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AboutComponent,
    HelpComponent,
    NotFoundComponent,
    CalendarComponent,
    IncomesComponent,
    ExpensesComponent,
    AddExpensesComponent,
    AddIncomesComponent,
    AddEventComponent,
    UpdateEventComponent,
    ChartsComponent,
    SetIncomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSortModule,
    MatRadioModule,

    FlexLayoutModule,

    NgChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
