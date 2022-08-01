import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AboutComponent } from './page/about/about.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HelpComponent } from './page/help/help.component';
import { CalendarComponent } from './page/calendar/calendar.component';
import { IncomesComponent } from './page/incomes/incomes.component';
import { ExpensesComponent } from './page/expenses/expenses.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'incomes',
    component: IncomesComponent
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
//new change test

@NgModule({
  declarations:[],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{}

/*
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/