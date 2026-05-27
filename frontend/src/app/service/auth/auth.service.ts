import {inject, Injectable} from '@angular/core';
import {UserStore} from '../../store/user.store';
import {UserModel} from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userStore = inject(UserStore);

  getUser() {
    return this.userStore.user();
  }

  isAuthenticated() {
    return this.userStore.isAuthenticated();
  }

  setUser(user: UserModel) {
    this.userStore.setUser({...user});
  }

  clear() {
    this.userStore.clear();
  }
}
