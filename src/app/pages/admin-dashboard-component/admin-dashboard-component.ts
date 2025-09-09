import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../../services/reservation-service';

@Component({
  selector: 'app-admin-dashboard-component',
  imports: [],
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.css'
})
export class AdminDashboardComponent implements OnInit {

  reservationCount: number = 0;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservationCount();
  }

  loadReservationCount(): void {
    this.reservationService.countReservations().subscribe({
      next: (count: number) => this.reservationCount = count,
      error: (err) => console.error('Erreur lors du comptage des réservations', err)
    });
  }
}
