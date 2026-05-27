import {Component, inject} from '@angular/core';
import {UserFormComponent} from "../../components/user-form/user-form.component";
import {UserStore} from '../../store/user.store';
import {UserRole} from '../../models/user/user-role.enum';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  imports: [
    UserFormComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  protected userStore = inject(UserStore);
  protected readonly UserRole = UserRole;
  private snackBar = inject(MatSnackBar);

  protected onUpdateUser() {
    this.snackBar.open('Update realizado com sucesso!', 'Fechar', {duration: 3000});
  }
}
