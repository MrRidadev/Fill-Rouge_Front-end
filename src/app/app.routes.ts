import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {HeroSection} from './pages/hero-section/hero-section';
import {DashboardAdmin} from './pages/dashboard-admin/dashboard-admin';
import {DashboardFilm} from './pages/dashboard-film/dashboard-film';

export const routes: Routes = [
  {
    path: '',
    component: HeroSection
  },
  {
    path: 'login',
    component : Login
  },
  {
    path: 'register',
    component : Register
  },
  {
    path:'dashboard-admin',
    component : DashboardAdmin
  },
  {
    path: 'dashboard-film',
    component : DashboardFilm
  }
];
