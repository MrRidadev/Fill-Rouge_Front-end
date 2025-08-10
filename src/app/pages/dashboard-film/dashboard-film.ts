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
      console.log(data);
      this.films = data;
    });
  }

  deleteFilm(idFilm: number) {
    console.log(idFilm);
    if (confirm('Voulez-vous vraiment supprimer ce film ?')) {
      this.filmService.deleteFilm(idFilm).subscribe({
        next: () => {
          this.films = this.films.filter(f => f.id_film !== idFilm);
          alert('Film supprimé avec succès !');
        },
        error: err => {
          console.error(err);
          alert('Erreur lors de la suppression du film.');
        }
      });
    }
  }
}
