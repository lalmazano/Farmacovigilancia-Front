import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from '@angular/router';
import { LoginService } from '../api/open-services/login.service';
import { EnrcryptService } from './enrcrypt.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticacionService {
  private nameItemsessionStorage:string = 'userSIGAD'
  private userSubject: BehaviorSubject<UserModel>;
  public user:Observable<UserModel>;
  private estaLogeado = new BehaviorSubject<boolean>(false)
  constructor(
    private router:Router,
    private _loginService:LoginService,
    private _crypt: EnrcryptService  
  ) { 
    let savedObject
    try{
      savedObject = _crypt.desencriptarTexto(sessionStorage.getItem(this.nameItemsessionStorage)!)
    }catch{
      savedObject = null
    }
    this.userSubject = new BehaviorSubject<UserModel>(<UserModel>JSON.parse(savedObject ?? '{"username":"noUser","roles":[]}'));
    this.user = this.userSubject.asObservable();
  }

  public get UserValue():UserModel{
    return this.userSubject.value
  }
  
  setUser(user:UserModel){
    let jsonSave= JSON.stringify(user);
    
    sessionStorage.setItem(this.nameItemsessionStorage,this._crypt.encriptarTexto(jsonSave));
    this.userSubject.next(user)
  }

  logOut(){
    sessionStorage.removeItem(this.nameItemsessionStorage);
    this.estaLogeado.next(false);
    this.userSubject.next(JSON.parse('{"username":"noUser","roles":[]}'));
    this.router.navigateByUrl('/home')
    this.router.navigate(['/auth'])
  }
}
