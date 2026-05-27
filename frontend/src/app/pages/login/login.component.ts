import {Component, inject, OnInit, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {inputClasses} from '../../shared/input-classes.util';
import {MatError} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginModel} from '../../models/login/login.model';
import {LoginService} from '../../service/login/login.service';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {UserRole} from '../../models/user/user-role.enum';
import {Button} from '../../components/button/button';

@Component({
  selector: 'app-login',
  imports: [
    NgClass,
    MatError,
    ReactiveFormsModule,
    RouterLink,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  protected readonly inputClasses = inputClasses;
  protected loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });
  protected loading = false;
  protected error = signal(false);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      if (this.authService.getUser()?.roles.includes(UserRole.ADMIN)) {
        this.router.navigate(['/admin']).then();
        return;
      }
      this.router.navigate(['/user']).then();
    }
  }

  protected onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const value = this.loginForm.value as LoginModel;
    this.loading = true;
    this.loginService.login(value).subscribe({
      next: () => {
        this.loginService.getUser().subscribe(user => {
          this.loading = false;
          if (this.authService.getUser()?.roles.includes(UserRole.ADMIN)) {
            this.router.navigate(['/admin']).then();
            return;
          }
          this.router.navigate(['/user']).then();
        })
      },
      error: (err) => {
        this.error.set(true);
        this.loading = false;
        console.error(err);
      },
    });
  }
}
