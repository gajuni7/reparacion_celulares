import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TOKEN_AUTH } from '../models/Autenticacion';
import { jwtDecode } from 'jwt-decode';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem(TOKEN_AUTH);

  if (token && !isTokenExpired(token) && state.url === '/login') {
    router.navigate(['/inicio']);
    return false;
  }


  if (token && !isTokenExpired(token)) {
    return true;
  }

  localStorage.removeItem(TOKEN_AUTH);

  if (state.url === '/login') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp;

    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (e) {
    return true;
  }
}
