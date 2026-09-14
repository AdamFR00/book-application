import { HttpClient } from '@angular/common/http';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { catchError, map, of} from 'rxjs';
map

export const rootRedirectGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get(`${environment.apiUrl}/auth/me`, {withCredentials: true})
  .pipe(
    map(() => {
      return router.createUrlTree(['/home']);
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    })
  );
};
