import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from '../store/user.store';
import {LoginService} from '../service/login/login-service';
import {firstValueFrom} from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const loginService = inject(LoginService);
  if (userStore.isAuthenticated()) {
    if (userStore.hasRole(route.data['role'])) {
      return true;
    } else {
      const res = await firstValueFrom(loginService.refreshToken());
      if (res.ok && res.status === 200 && userStore.hasRole(route.data['role'])) {
        return true;
      }
    }
  }
  router.createUrlTree(['/404']);
  return false;
};
