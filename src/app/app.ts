import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './pages/navbar/navbar';
import {HeroSection} from './pages/hero-section/hero-section';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroSection, Login, Register],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Front-end';
}
