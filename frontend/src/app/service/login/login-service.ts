import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginModel} from '../../models/login/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  constructor(private client: HttpClient) {
  }

  login(loginModel: LoginModel) {
    return this.client.post(`${this.baseUrl}/login`, loginModel);
  }

  logout() {
    return this.client.post(`${this.baseUrl}/logout`, {});
  }

  refreshToken() {
    return this.client.post(`${this.baseUrl}/refresh`, {});
  }
}
