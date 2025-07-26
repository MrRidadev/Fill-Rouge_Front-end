import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {HeroSection} from './pages/hero-section/hero-section';

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
  }
];
