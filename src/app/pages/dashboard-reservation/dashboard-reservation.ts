import { Component, OnInit } from '@angular/core';
import { ReservationService, ReservationDTO } from '../../services/reservation-service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-reservation',
  templateUrl: './dashboard-reservation.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./dashboard-reservation.css']
})
export class DashboardReservation implements OnInit {

  reservations: ReservationDTO[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data: ReservationDTO[]) => {
        this.reservations = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des réservations';
        this.isLoading = false;
      }
    });
  }
}
