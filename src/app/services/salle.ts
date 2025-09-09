import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth';


export interface Salle{
  id?: number;
  nom : string;
  capacite : number;
}
@Injectable({
  providedIn: 'root'
})
export class SalleService  {

  private apiUrl = 'http://localhost:8087/salle';

  constructor(private http: HttpClient,private auth: AuthService) { }

  // Fonction pour récupérer le token depuis le localStorage
  private getHeaders() {
    const token = this.auth.getToken();
    console.log("salle: "+token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // afficher toutes les salles
  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/getAll`);
  }

  // ajouter une salle
  addSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(`${this.apiUrl}/addSalle`, salle, {
      headers: this.getHeaders()
    });
  }

  // Supprimer salle
  deleteSalle(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}
