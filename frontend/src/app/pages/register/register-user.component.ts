import {Component, inject} from '@angular/core';
import {UserFormComponent} from '../../components/user-form/user-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    UserFormComponent
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  private router = inject(Router);

  onCreateUser() {
    this.router.navigate(['/']).then();
  }
}
