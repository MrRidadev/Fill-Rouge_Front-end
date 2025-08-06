import {Component, OnInit} from '@angular/core';
import {Film, FilmService} from '../../services/film-service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard-client',
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard-film.html',
  standalone: true,
  styleUrl: './dashboard-film.css'
})
export class DashboardFilm implements OnInit {

  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe((data) => {
      this.films = data;
    });
  }
}
