import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from './user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService); 
  const token = userService.getToken(); 

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
