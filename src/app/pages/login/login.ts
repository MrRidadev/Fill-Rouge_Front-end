import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest, AuthResponse } from '../../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const loginData: LoginRequest = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response: AuthResponse) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = response.message;
            // sauvegarder utilisateur dans localStorage
            this.authService.saveUser(response);
            setTimeout(() => {
              this.redirectBasedOnRole();
            }, 1000);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
          console.error('Erreur login:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  redirectBasedOnRole(): void {
    if (this.authService.getCurrentUser()?.role === 'ADMIN') {
      this.router.navigate(['/dashboard-admin/dashboard-init']);
    } else {
      this.router.navigate(['/']);
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  get email() { return this.loginForm.get('email'); }
  get motDePasse() { return this.loginForm.get('motDePasse'); }
}
