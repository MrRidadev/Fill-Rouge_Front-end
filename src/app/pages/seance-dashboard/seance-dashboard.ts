import { Component, OnInit } from '@angular/core';
import { Seance, SeanceRequest, SeanceService } from '../../services/seance';
import { AuthService } from '../../services/auth';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seance-dashboard',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './seance-dashboard.html',
  styleUrls: ['./seance-dashboard.css']
})
export class SeanceDashboard implements OnInit {

  seances: Seance[] = [];
  selectedSeance: Seance | null = null;

  seance: SeanceRequest = {
    nom_seance: '',
    dateHeure: '',
    filmId: 0,
    salleId: 0
  };

  message: string = '';

  constructor(
    private seanceService: SeanceService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      alert('Vous devez être connecté en tant qu\'ADMIN pour ajouter une séance.');
      return;
    }
    this.loadSeances();
  }

  loadSeances() {
    this.seanceService.getSeance().subscribe((data: Seance[]) => {
      this.seances = data;
    });
  }

  // Ajouter séance
  onSubmit() {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser?.role !== 'ADMIN') {
      this.message = "Vous n'avez pas les droits pour ajouter une séance";
      return;
    }
    this.seanceService.addSeance(this.seance).subscribe({
      next: (res: any) => {
        this.message = 'Séance ajoutée !';
        this.loadSeances();
      },
      error: (err: any) => {
        this.message = 'Erreur : ' + err.message;
      }
    });
  }

  // Supprimer séance
  deleteSeance(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette séance ?')) {
      this.seanceService.deleteSeance(id).subscribe({
        next: (res: string) => {
          this.message = res;
          this.loadSeances();
        },
        error: (err: any) => {
          this.message = 'Erreur : ' + err.message;
        }
      });
    }
  }

  // Ouvrir le modal avec les infos de la séance
  openEditModal(seance: Seance) {
    this.selectedSeance = { ...seance };
  }

  // Sauvegarder la modification
  updateSeance() {
    if (this.selectedSeance) {
      const request: SeanceRequest = {
        nom_seance: this.selectedSeance.nomSeance,
        dateHeure: this.selectedSeance.dateHeure.toString(),
        filmId: this.selectedSeance.film.idFilm,
        salleId: this.selectedSeance.salle.id
      };

      this.seanceService.updateSeance(this.selectedSeance.id, request).subscribe({
        next: () => {
          this.message = 'Séance modifiée avec succès !';
          this.loadSeances();
          this.selectedSeance = null;
        },
        error: (err) => {
          this.message = 'Erreur lors de la modification de la séance';
          console.error(err);
        }
      });
    }
  }

}
