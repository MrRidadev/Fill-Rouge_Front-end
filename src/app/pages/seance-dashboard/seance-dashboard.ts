import {Component, OnInit} from '@angular/core';
import {Seance, SeanceRequest} from '../../services/seance';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

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

  constructor(private seanceService : Seance) {}

  ngOnInit() {
    this.loadSeances();
  }

  loadSeances() {
    this.seanceService.getSeance().subscribe((data) => {
      this.seances = data;
    })
  }


  onSubmit() {
    this.seanceService.addSeance(this.seance).subscribe({
      next: (res) => {
        this.message = 'Séance ajoutée avec succès !';
        console.log(res);
      },
      error: (err) => {
        this.message = 'Erreur lors de l’ajout de la séance';
        console.error(err);
      }
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
