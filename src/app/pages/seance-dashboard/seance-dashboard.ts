import {Component, OnInit} from '@angular/core';
import {Seance, SeanceRequest} from '../../services/seance';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-seance-dashboard',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './seance-dashboard.html',
  styleUrl: './seance-dashboard.css'
})
export class SeanceDashboard implements OnInit {

  seances: Seance[] = [];
  selectedSeance: any = null;

  seance: SeanceRequest = {
    nom_seance: '',
    dateHeure: '',
    filmId: 0,
    salleId: 0
  };

  message: string = '';

  constructor(
    private seanceService : Seance,
    private auth: Auth
  ) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    console.log(user);
    if (!user || user.role !== 'ADMIN') {
      alert('Vous devez être connecté en tant qu\'ADMIN pour ajouter une séance.');
      return;
    }
    this.loadSeances();
  }


  loadSeances() {
    this.seanceService.getSeance().subscribe((data) => {
      this.seances = data;
    })
  }

// ajouter séance
  onSubmit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser?.role !== 'ADMIN') {
      this.message = "Vous n'avez pas les droits pour ajouter une séance";
      return;
    }
    this.seanceService.addSeance(this.seance).subscribe({
      next: res => { this.message = 'Séance ajoutée !'; this.loadSeances(); },
      error: err => { this.message = 'Erreur : ' + err.message; }
    });
  }



  // Supprimer séance
  deleteSeance(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette séance ?')) {
      this.seanceService.deleteSeance(id).subscribe(() => {
        this.loadSeances();
      });
    }
  }


  // Ouvrir le modal avec les infos de la séance
  openEditModal(seance: any) {
    this.selectedSeance = { ...seance }; // clone
  }

// Sauvegarder la modification
  updateSeance() {
    if (this.selectedSeance) {
      this.seanceService.updateSeance(this.selectedSeance.id, this.selectedSeance).subscribe({
        next: (res) => {
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
