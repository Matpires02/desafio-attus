import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {authGuard} from './guards/auth-guard';
import {UserRole} from './models/user/user-role.enum';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'user',
    loadComponent: () => import('./pages/user/user.component').then(value => value.UserComponent),
    canActivate: [authGuard],
    data: {roles: [UserRole.ADMIN, UserRole.USER]}
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(value => value.AdminComponent),
    canActivate: [authGuard],
    data: {roles: [UserRole.ADMIN]}
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register-user.component').then(value => value.RegisterUserComponent),
  },
  {path: '404', loadComponent: () => import('./pages/error/error.component').then(value => value.ErrorComponent)},
  {path: '**', redirectTo: '/404'},
];
