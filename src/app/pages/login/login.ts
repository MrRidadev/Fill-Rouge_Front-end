import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {Auth, LoginRequest} from '../../services/auth';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgIf
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    public authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Rediriger si déjà connecté
    //if (this.authService.isLoggedIn()) {
     // this.redirectBasedOnRole();
    //}
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
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = response.message;
            setTimeout(() => {
              this.redirectBasedOnRole();
            }, 1000);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
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
    if (this.authService.isAdmin()) {
      this.router.navigate(['/dashboard-admin']);
    } else if (this.authService.isClient()) {
      this.router.navigate(['/dashboard-film']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  // Getters pour faciliter l'accès aux champs dans le template
  get email() { return this.loginForm.get('email'); }
  get motDePasse() { return this.loginForm.get('motDePasse'); }
}
