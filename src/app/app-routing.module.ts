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
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './page/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'help', //On le laisse, accessible depuis l'url /help
    component: HelpComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'incomes',
    component: IncomesComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate : [AuthGuard]
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