import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nomComplet: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  userId: number;
  nomComplet: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8087/auth';

  constructor(private http: HttpClient) {}

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, req);
  }

  register(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, req);
  }

  saveUser(user: AuthResponse) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): AuthResponse | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  getToken(): string | null {
    return this.getCurrentUser()?.token || null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }

  isClient(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'CLIENT';
  }
}
