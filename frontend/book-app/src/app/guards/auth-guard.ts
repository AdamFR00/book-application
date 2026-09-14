import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get(`${environment.apiUrl}/auth/me`, {
    withCredentials: true
  }).pipe(
    map(() => true),

    catchError(() => {
      return of(router.createUrlTree(['/login']));
    })
  );
};
