import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../../services/reservation-service';
import {FilmService} from '../../services/film-service';
import {SalleService} from '../../services/salle';
import {ClientService} from '../../services/client-service';

@Component({
  selector: 'app-admin-dashboard-component',
  imports: [],
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.css'
})
export class AdminDashboardComponent implements OnInit {

  reservationCount: number = 0;
  filmCount: number = 0;
  salleCount: number = 0;
  clientCount: number = 0;

  constructor(
    private reservationService: ReservationService,
    private filmService: FilmService,
    private salleService: SalleService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
        this.loadReservationCount(),
        this.loadClientCount(),
        this.loadFilmCount(),
        this.loadSalleCount()
    ;

  }

  loadReservationCount(): void {
    this.reservationService.countReservations().subscribe({
      next: (count: number) => this.reservationCount = count,
      error: (err) => console.error('Erreur lors du comptage des réservations', err)
    });
  }

  loadFilmCount(): void {
    this.filmService.countFilm().subscribe({
      next: (count: number) => this.filmCount = count,
      error: (err) => console.error('Erreur lors du comptage des films', err)
    });
  }

  loadSalleCount(): void {
    this.salleService.countSalle().subscribe({
      next: (count: number) => this.salleCount = count,
      error: (err) => console.error('Erreur lors du comptage des salle', err)
    });
  }

  loadClientCount(): void {
    this.clientService.countClient().subscribe({
      next: (count: number) => this.clientCount = count,
      error: (err) => console.error('Erreur lors du comptage des clients', err)
    });
  }
}
