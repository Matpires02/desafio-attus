import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from '../store/user.store';
import {LoginService} from '../service/login/login.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const loginService = inject(LoginService);
  console.log(route.data)
  const role = route.data['roles'];
  if (!role) {
    return true;
  }

  if (userStore.isAuthenticated() && userStore.hasRole(role)) {
    return true;
  }

  router.navigate(['/404']);
  return false;
};
