import { Component, OnInit } from '@angular/core';
import {Salle, SalleService} from '../../services/salle';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-admin-salles-dashboard',
  templateUrl: './admin-salles-dashboard.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./admin-salles-dashboard.css']
})
export class AdminSallesDashboard implements OnInit {

  salles: Salle[] = [];
  newSalle: Salle = { nom: '', capacite: 0 };
  message: string = '';


  constructor(private salleService: SalleService) { }

  ngOnInit(): void {
    this.loadSalles();
  }

  // Charger toutes les salles
  loadSalles(): void {
    this.salleService.getAllSalles().subscribe({
      next: (data: Salle[]) => this.salles = data,
      error: (err: any) => console.error(err)
    });
  }

  // Ajouter une nouvelle salle
  addSalle(): void {
    this.salleService.addSalle(this.newSalle).subscribe({
      next: (salle: Salle) => {
        this.salles.push(salle);
        this.newSalle = { nom: '', capacite: 0 };
      },
      error: (err: any) => console.error(err)
    });
  }

  // Supprimer séance
  deleteSalle(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette Salle ?')) {
      this.salleService.deleteSalle(id).subscribe({
        next: (res: string) => {
          this.message = res;
          this.loadSalles();
        },
        error: (err: any) => {
          this.message = 'Erreur : ' + err.message;
        }
      });
    }
  }
}
