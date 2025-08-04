import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {Auth, RegisterRequest} from '../../services/auth';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register implements OnInit {

  public registerForm!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  public successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Rediriger si déjà connecté
    if (this.authService.isLoggedIn()) {
      this.redirectBasedOnRole();
    }
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      nomComplet: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      modPass: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CLIENT', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const userData: RegisterRequest = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error && typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
          }
          console.error('Erreur inscription:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  redirectBasedOnRole(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/pages/dashboard-admin']);
    } else if (this.authService.isClient()) {
      this.router.navigate(['/pages/dashboard-client']);
    } else {
      this.router.navigate(['/']);
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  // Getters pour faciliter l'accès aux champs dans le template
  public get nomComplet() { return this.registerForm.get('nomComplet'); }
  public get email() { return this.registerForm.get('email'); }
  public get modPass() { return this.registerForm.get('modPass'); }
  public get role() { return this.registerForm.get('role'); }
}
