import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {authGuard} from './guards/auth-guard';
import {UserRole} from './models/user/user-role.enum';
import {userResolver} from './pages/user/user-resolver';

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
    canActivate: [authGuard],
    data: {roles: [UserRole.ADMIN]},
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/admin/admin.component').then(value => value.AdminComponent),
        canActivate: [authGuard],
        data: {roles: [UserRole.ADMIN]},
      },
      {
        path: 'user/edit/:id',
        loadComponent: () => import('./pages/user/user.component').then(value => value.UserComponent),
        canActivate: [authGuard],
        resolve: {user: userResolver},
        data: {roles: [UserRole.ADMIN]}
      },
      {
        path: 'user/create',
        data: {isAdmin: true, roles: [UserRole.ADMIN]},
        canActivate: [authGuard],
        loadComponent: () => import('./pages/register/register-user.component').then(value => value.RegisterUserComponent),
      },
    ]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register-user.component').then(value => value.RegisterUserComponent),
  },
  {path: '404', loadComponent: () => import('./pages/error/error.component').then(value => value.ErrorComponent)},
  {path: '**', redirectTo: '/404'},
];
