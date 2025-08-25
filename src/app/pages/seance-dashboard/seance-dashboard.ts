import {Component, OnInit} from '@angular/core';
import {Seance, SeanceRequest} from '../../services/seance';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-seance-dashboard',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './seance-dashboard.html',
  styleUrl: './seance-dashboard.css'
})
export class SeanceDashboard implements OnInit {

  seances: Seance[] = [];

  seance: SeanceRequest = {
    nom_seance: '',
    dateHeure: '',
    filmId: 0,
    salleId: 0
  };

  message: string = '';

  constructor(private seanceService : Seance) {}

  ngOnInit() {
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

}
