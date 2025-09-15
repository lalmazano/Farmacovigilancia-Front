import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Roles } from './roles';
import { UserModel } from '../models/UserModel';
import { AuthenticacionService } from '../services/utils/authenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class MedicoGuard  {

    public user: UserModel

  constructor(
    private _router: Router,
    private _authService: AuthenticacionService
    ) {
    this.user = this._authService.UserValue
  }

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {    
    if (this.user.roles.indexOf(Roles.Medico) < 0) {
      this._router.navigateByUrl('/access-denied');
      return false;
    }
    return true;
  }
}