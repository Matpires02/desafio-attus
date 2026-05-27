import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {LoginService} from '../service/login/login.service';
import {environment} from '../../environments/environment';
import {BehaviorSubject, catchError, filter, switchMap, take, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  let isRefreshing = false;

  const refreshSubject = new BehaviorSubject<boolean>(false);

  if(req.url.includes(environment.apiUrl) && !req.url.includes('auth/refresh') || !req.url.includes('auth/login')) {
    const cloned = req.clone({
      withCredentials: true
    });

    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status !== 401) {
          return throwError(() => error);
        }


        if (req.url.includes('/auth/login') ||
          req.url.includes('/auth/refresh')) {

          return throwError(() => error);
        }

        // 🔄 Se já estiver refreshando
        if (isRefreshing) {

          return refreshSubject.pipe(

            filter(done => done),

            take(1),

            switchMap(() => next(cloned))
          );
        }

        isRefreshing = true;

        refreshSubject.next(false);

        // 🔥 Tenta refresh token
        return loginService.refreshToken().pipe(

          switchMap(() => {

            isRefreshing = false;

            refreshSubject.next(true);

            // 🔁 Refaz request original
            return next(cloned);
          }),

          catchError(refreshError => {

            isRefreshing = false;

            loginService.logout().subscribe();

            return throwError(() => refreshError);
          })
        );
      })
    );
  }
  return next(req);
};
