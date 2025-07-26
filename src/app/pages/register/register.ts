import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {Auth, RegisterRequest} from '../../services/auth';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register implements OnInit {

  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

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
      confirmPassword: ['', [Validators.required]],
      role: ['CLIENT', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validateur personnalisé pour vérifier que les mots de passe correspondent
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('modPass');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { confirmPassword, ...registerData } = this.registerForm.value;
      const userData: RegisterRequest = registerData;

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
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
      this.router.navigate(['/admin/dashboard']);
    } else if (this.authService.isClient()) {
      this.router.navigate(['/client/dashboard']);
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
  get nomComplet() { return this.registerForm.get('nomComplet'); }
  get email() { return this.registerForm.get('email'); }
  get modPass() { return this.registerForm.get('modPass'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get role() { return this.registerForm.get('role'); }
}
