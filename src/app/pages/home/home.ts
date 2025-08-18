import { Component } from '@angular/core';
import {FilmDirectory} from "../film-directory/film-directory";
import {MovieCard} from "../movie-card/movie-card";
import {MoviesInCinema} from "../movies-in-cinema/movies-in-cinema";
import {Navbar} from "../navbar/navbar";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
    imports: [
        FilmDirectory,
        MovieCard,
        MoviesInCinema,
        Navbar,
        RouterOutlet
    ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
