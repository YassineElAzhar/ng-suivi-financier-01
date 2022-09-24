import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SearchComponent } from './page/search/search.component';
import { AboutComponent } from './page/about/about.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { HelpComponent } from './page/help/help.component';
import { CalendarComponent } from './page/calendar/calendar.component';
import { IncomesComponent } from './page/incomes/incomes.component';
import { ExpensesComponent } from './page/expenses/expenses.component';
import { ChartsComponent } from './page/charts/charts.component';

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
    path: 'search',
    component: SearchComponent
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
    path: 'help', //On le laisse, accessible depuis l'url /help
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
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

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