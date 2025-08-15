import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './pages/navbar/navbar';
import {HeroSection} from './pages/hero-section/hero-section';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {MoviesInCinema} from './pages/movies-in-cinema/movies-in-cinema';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroSection, Login, Register, MoviesInCinema],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Front-end';
}
