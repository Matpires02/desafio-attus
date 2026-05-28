import {Component, inject, OnInit} from '@angular/core';
import {UserFormComponent} from "../../components/user-form/user-form.component";
import {UserStore} from '../../store/user.store';
import {UserRole} from '../../models/user/user-role.enum';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserModel} from '../../models/user/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Button} from '../../components/button/button';

@Component({
  selector: 'app-user',
  imports: [
    UserFormComponent,
    Button
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  protected userStore = inject(UserStore);
  protected readonly UserRole = UserRole;
  protected user: UserModel | null | undefined;
  private snackBar = inject(MatSnackBar);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(user => this.user = user['user']);
  }

  protected onUpdateUser() {
    this.snackBar.open('Update realizado com sucesso!', 'Fechar', {duration: 3000, verticalPosition: "top"});
  }

  protected logout() {
    this.userStore.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/']).then();
  }
}
