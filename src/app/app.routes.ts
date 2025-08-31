import { Routes } from '@angular/router';
import {Register} from './pages/register/register';
import {DashboardAdmin} from './pages/dashboard-admin/dashboard-admin';
import {DashboardFilm} from './pages/dashboard-film/dashboard-film';
import {Login} from './pages/login/login';
import {Home} from './pages/home/home';
import {SeanceDashboard} from './pages/seance-dashboard/seance-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component :Login
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
  },
  {
    path: 'dashboard-Seance',
    component : SeanceDashboard
  },


];



