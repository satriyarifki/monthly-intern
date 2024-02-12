import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService : AuthService = inject(AuthService)
  const router : Router = inject(Router)
  const actRoute : ActivatedRoute = inject(ActivatedRoute)
  const alertService : AlertService = inject(AlertService)


  if(authService.getUser().roleId == 1){
    
    return true
  } else {
    // actRoute.data.subscribe(v => {console.log(v)})
    // console.log(actRoute.snapshot.params['id']);
    alertService.onCallAlert('Invalid Authorize!', AlertType.Info)
    router.navigate(['/']);
    return false
  }
};
