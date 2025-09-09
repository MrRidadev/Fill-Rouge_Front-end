import { Injectable } from '@angular/core';
import {Seance} from './seance';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth';
import {Observable} from 'rxjs';


export interface Reservation {
  id: number;
  dateReservation: Date;
  numPlace: number;
  statut: string;
  client: {
    id: number;
    nomComplet: string;
    email: string;
  };
  seance: Seance;
}

export interface ReservationRequest {
  seanceId: number;
  clientId: number;
  numPlace: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8087/reservation';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    const token = this.auth.getToken();
    console.log("reservation: "+token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // Créer une réservation
  createReservation(reservation: ReservationRequest): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/create`, reservation, {
      headers: this.getHeaders()
    });
  }

  // Compter les réservations
  countReservations(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`, {
      headers: this.getHeaders()
    });
  }
}
