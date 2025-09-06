import {Component, OnInit} from '@angular/core';
import {Seance, SeanceService} from '../../services/seance';
import {NgForOf} from '@angular/common';
import {ReservationRequest, ReservationService} from '../../services/reservation-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-seance-list',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './seance-list.html',
  styleUrl: './seance-list.css'
})
export class SeanceList implements OnInit {

  seances: Seance[] = [];
  clientId: number = 1;
  numPlace: number =0;

  constructor(
    private seanceService : SeanceService,
  private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.loadSeances();
  }

  loadSeances() {
    this.seanceService.getSeance().subscribe((data) => {
      this.seances = data;
    })
  }

  reserver(seanceId: number) {
    const reservation: ReservationRequest = {
      seanceId: seanceId,
      clientId: this.clientId,
      numPlace: this.numPlace
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (res) => alert(` Réservation réussie pour la place ${res.numPlace}`),
      error: (err) => alert(err.error)
    });
  }

}
