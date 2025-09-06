import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Salle{
  id : number;
  nom : string;
  capacite : number;
}
@Injectable({
  providedIn: 'root'
})
export class Salle {

  private apiUrl = 'http://localhost:8087/salle';

  constructor(private http: HttpClient) { }

  // Fonction pour récupérer le token depuis le localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ton token JWT stocké
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // GET toutes les salles
  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/getAll`);
  }

  // POST ajouter une salle
  addSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(`${this.apiUrl}/addSalle`, salle, {
      headers: this.getAuthHeaders()
    });
  }
}
