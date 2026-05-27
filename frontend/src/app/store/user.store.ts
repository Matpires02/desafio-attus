import { Injectable, signal, computed } from '@angular/core';
import {UserModel} from '../models/user/user.model';
import {UserRole} from '../models/user/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private _user = signal<UserModel | null>(null);

  user = computed(() => this._user());

  isAuthenticated = computed(() => !!this._user());

  roles = computed(() => this._user()?.roles ?? []);

  setUser(user: UserModel) {
    this._user.set(user);
  }

  clear() {
    this._user.set(null);
  }

  hasRole(role?: UserRole): boolean {
    if (!role) return false;
    return this.roles().includes(role);
  }

  hasAnyRole(roles?: UserRole[]): boolean {
    if (!roles || roles.length === 0) return false;
    return this.roles().some(r => roles.includes(r));
  }
}
