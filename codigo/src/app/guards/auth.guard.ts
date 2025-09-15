import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserModel } from '../models/UserModel';
import { AuthenticacionService } from '../services/utils/authenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private _router: Router, private _auth:AuthenticacionService) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    let user:UserModel =  this._auth.UserValue
    if(!user.token){
      this._router.navigateByUrl('/auth');
      return false
    }
    
    if (user.token!.length < 1) {
      this._router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}