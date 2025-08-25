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
        next: (message) => {
          alert(message);
          this.films = this.films.filter(f => f.idFilm !== idFilm); // Mise à jour immédiate de la liste
        },
        error: err => {
          console.error(err);
          alert('Erreur lors de la suppression du film.');
        }
      });
    }
  }


  getImageUrl(imageData: string): string {
    if (!imageData) {
      return 'https://via.placeholder.com/300x400?text=Pas+d\'image';
    }

    // Si c'est déjà une URL complète
    if (imageData.startsWith('http')) {
      return imageData;
    }

    // Si c'est du base64 sans le préfixe
    if (!imageData.startsWith('data:image/')) {
      return `data:image/jpeg;base64,${imageData}`;
    }

    // Si c'est déjà formaté correctement
    return imageData;
  }


}
