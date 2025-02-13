import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.getEmail() === "") { 
    router.navigate([""]);
    return false;
  }
  if(userService.getToken() === "") { 
    router.navigate([""]);
    return false;
  }

  const isTokenExpired: boolean = checkTokenExpiration(userService.getToken());
  if(isTokenExpired) {
    router.navigate([""]);
    return false;
  }

  return true;
};

function checkTokenExpiration(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    if(!decoded.exp) return true;

    const expirationTime = decoded.exp * 1000;
    return expirationTime < Date.now();
  } catch (error) {
    return true;
  }
}