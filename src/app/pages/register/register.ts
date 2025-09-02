import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest, AuthResponse } from '../../services/auth';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register implements OnInit {

  public registerForm!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  public successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();


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

      const userData: RegisterRequest = {
        nomComplet: this.registerForm.value.nomComplet,
        email: this.registerForm.value.email,
        password: this.registerForm.value.modPass
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response.message;
          this.authService.saveUser(response);    //  sauvegarder user dans localStorage
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error || 'Erreur lors de l\'inscription. Veuillez réessayer.';
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
      this.router.navigate(['/']);
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
