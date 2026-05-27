import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from '../store/user.store';

export const authGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);
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
