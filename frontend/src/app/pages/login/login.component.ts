import {Component, inject, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {inputClasses} from '../../utils/input-classes.util';
import {MatError} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginModel} from '../../models/login/login.model';
import {LoginService} from '../../service/login/login.service';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {UserRole} from '../../models/user/user-role.enum';

@Component({
  selector: 'app-login',
  imports: [
    NgClass,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected readonly inputClasses = inputClasses;
  protected loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });
  private loginService = inject(LoginService);
  private router = inject(Router);
  private authService = inject(AuthService);
  protected loading = false;
  protected error = signal(false);

  protected onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const value = this.loginForm.value as LoginModel;
    this.loading = true;
    this.loginService.login(value).subscribe({
      next: () => {
        this.loading = false;
        if (this.authService.getUser()?.roles.includes(UserRole.ADMIN)) {
          this.router.navigate(['/admin']).then();
          return;
        }
        this.router.navigate(['/user']).then();
      },
      error: (err) => {
        this.error.set(true);
        this.loading = false;
        console.error(err);
      },
    });
  }
}
