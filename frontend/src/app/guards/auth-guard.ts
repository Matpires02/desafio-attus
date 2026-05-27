import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from '../store/user.store';
import {UserService} from '../service/user/user.service';
import {LoginService} from '../service/login/login.service';
import {lastValueFrom} from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const userStore = inject(UserStore);
  const loginService = inject(LoginService);
  const router = inject(Router);
  const role = route.data['roles'];
  if (!role) {
    return true;
  }

  if (userStore.isAuthenticated()) {
    if (!userStore.hasAnyRole(role)) {
      router.navigate(['/404']);
      return false
    }
    return true;
  } else {
    if (localStorage.getItem('token')) {
      await lastValueFrom(loginService.getUser());

      if (!userStore.hasAnyRole(role)) {
        router.navigate(['/404']);
        return false
      }
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
};
