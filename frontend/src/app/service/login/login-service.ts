import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginModel} from '../../models/login/login.model';
import {tap} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  constructor(private client: HttpClient, private auth: AuthService) {
  }

  login(loginModel: LoginModel) {
    return this.client.post<any>(`${this.baseUrl}/login`, loginModel, {observe: 'response'}).pipe(tap(res => {
      this.getUser().subscribe(user => this.auth.setUser(user))
    }));
  }

  logout() {
    return this.client.post(`${this.baseUrl}/logout`, {}, { withCredentials: true}).pipe(tap(()=> this.auth.clear()));
  }

  refreshToken() {
    return this.client.post(`${this.baseUrl}/refresh`, {}, { withCredentials: true});
  }

  getUser() {
    return this.client.get<UserModel>(`${this.baseUrl}/user`, { withCredentials: true});
  }
}
