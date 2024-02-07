import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const outAuthGuard: CanActivateFn = (route, state) => {
  const authService : AuthService = inject(AuthService)
  const router : Router = inject(Router)
  // const alertService : AlertService = inject(AlertService)

  if(authService.getToken() == null){
    return true
  } else {
    // alertService.onCallAlert('You Need Login First !', AlertType.Info)
    router.navigate(['/']);
    return false
  }
};
