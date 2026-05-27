import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginModel} from '../../models/login/login.model';
import {firstValueFrom, map, switchMap, tap} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../../models/user/user.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private cookieService = inject(CookieService);

  constructor(private client: HttpClient, private auth: AuthService) {
  }

  login(loginModel: LoginModel) {
    return this.client.post<any>(`${this.baseUrl}/login`, loginModel).pipe(tap(res => {
      localStorage.setItem('token', res.token);
    }));
  }

  logout() {
    return this.client.post(`${this.baseUrl}/logout`, {}).pipe(tap(() => {
      this.auth.clear();
      localStorage.removeItem('token');
    }));
  }

  getUser() {
    return this.client.get<UserModel>(`${this.baseUrl}/me`).pipe(tap(async res => this.auth.setUser(res)));
  }
}
