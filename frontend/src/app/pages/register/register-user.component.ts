import {Component, inject, OnInit} from '@angular/core';
import {UserFormComponent} from '../../components/user-form/user-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStore} from '../../store/user.store';
import {UserRole} from '../../models/user/user-role.enum';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [
    UserFormComponent
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent implements OnInit {
  protected userStore = inject(UserStore);
  protected readonly UserRole = UserRole;
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private activatedRoute = inject(ActivatedRoute);
  private isAdminUpdate = false;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({isAdmin}) => this.isAdminUpdate = isAdmin as boolean);
  }

  onCreateUser() {
    this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {duration: 3000, verticalPosition: "top"});
    if (this.isAdminUpdate) {
      this.router.navigate(['/admin']).then();
      return;
    }
    this.router.navigate(['/']).then();
  }
}
