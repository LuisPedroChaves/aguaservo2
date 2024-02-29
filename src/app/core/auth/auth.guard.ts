import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if (localStorage.getItem('aguaservo2-session')) {
    return true;
  }

  localStorage.removeItem('aguaservo2-session');
  return router.parseUrl('/session');
};
