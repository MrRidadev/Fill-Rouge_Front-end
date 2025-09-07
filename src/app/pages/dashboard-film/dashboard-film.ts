import { Component, OnInit } from '@angular/core';
import { Film, FilmService } from '../../services/film-service';
import { NgForOf } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-film',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './dashboard-film.html',
  styleUrls: ['./dashboard-film.css']
})
export class DashboardFilm implements OnInit {
  films: Film[] = [];
  selectedFile: File | null = null;

  // Champs formulaire
  titre: string = '';
  langue: string = '';
  description: string = '';
  genre: string = '';
  editMode: boolean = false;
  filmIdToEdit: number | null = null;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms() {
    this.filmService.getFilms().subscribe((data) => this.films = data);
  }

  // Upload image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  //  Ajouter ou modifier film
  saveFilm() {
    const formData = new FormData();
    formData.append('titre', this.titre);
    formData.append('langue', this.langue);
    formData.append('description', this.description);
    formData.append('genre', this.genre);
    if (this.selectedFile) {
      formData.append('image_url', this.selectedFile);
    }

    if (this.editMode && this.filmIdToEdit) {
      // Update
      this.filmService.updateFilm(this.filmIdToEdit, formData).subscribe({
        next: (film) => {
          alert('Film mis à jour avec succès');
          this.loadFilms();
          this.resetForm();
        },
        error: err => alert('Erreur update : ' + err.error)
      });
    } else {
      // Add
      this.filmService.addFilm(formData).subscribe({
        next: (film) => {
          alert('Film ajouté avec succès');
          this.films.push(film);
          this.resetForm();
        },
        error: err => alert('Erreur ajout : ' + err.error)
      });
    }
  }

  //  Préparer formulaire pour modification
  editFilm(film: Film) {
    this.editMode = true;
    this.filmIdToEdit = film.idFilm;
    this.titre = film.titre;
    this.langue = film.langue;
    this.description = film.description;
    this.genre = film.genre;
  }

  // Réinitialiser
  resetForm() {
    this.editMode = false;
    this.filmIdToEdit = null;
    this.titre = '';
    this.langue = '';
    this.description = '';
    this.genre = '';
    this.selectedFile = null;
  }

  deleteFilm(idFilm: number) {
    if (confirm('Voulez-vous vraiment supprimer ce film ?')) {
      this.filmService.deleteFilm(idFilm).subscribe({
        next: (message) => {
          alert(message);
          this.films = this.films.filter(f => f.idFilm !== idFilm);
        },
        error: err => alert('Erreur suppression : ' + err.error)
      });
    }
  }
}
