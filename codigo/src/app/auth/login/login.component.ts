import { Component, HostBinding, Inject, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/api/open-services/login.service';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { AuthenticacionService } from 'src/app/services/utils/authenticacion.service';
import { LoginReturn } from 'src/app/services/api/model/loginReturn';
import { EnrcryptService } from 'src/app/services/utils/enrcrypt.service';
import { UsuarioLoginDto } from 'src/app/services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public dark_theme: boolean;
  public hide_password: boolean;
  public errorText:string = ''
  @HostBinding('class')
  get themeMode() {
    return this.dark_theme ? 'dark-theme' : 'light-theme';
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    public formLogin;
  constructor(
    private _router: Router,
    private formBuilder:FormBuilder,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2,
    private _loginService:LoginService,
    private _authService:AuthenticacionService,
    private _crypt:EnrcryptService
  ) {
    this.dark_theme = false;
    this.hide_password = true;
    this.formLogin = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    let host_class = 'light-theme'
    const theme_preference = sessionStorage.getItem('theme-mode');
    if (theme_preference != null) {
      this.dark_theme = JSON.parse(theme_preference)
      host_class = this.dark_theme ? 'dark-theme' : 'light-theme';
    }
    this.renderer.setAttribute(this.document.body, 'class', host_class)
  }

  public iniciarSesion() {
    if(this.formLogin.get('username')?.value == null || this.formLogin.get('username')?.value == undefined || this.formLogin.get('username')?.value == ''
    || this.formLogin.get('password')?.value == null || this.formLogin.get('password')?.value == undefined || this.formLogin.get('password')?.value == '')
    {
      return
    }
    let login:UsuarioLoginDto={
      username:  this.formLogin.get('username')?.value!,//this._crypt.encriptarTexto( this.formLogin.get('username')?.value!), //, //
      password:  this.formLogin.get('password')?.value!//this._crypt.encriptarTexto(this.formLogin.get('password')?.value!)  // //
    }
    this._loginService.apiLoginPost(login)
    .subscribe({
      next: (data) => {
        this._authService.setUser(data)
        let user : LoginReturn = {
          username : this._authService.UserValue.nombre,
          //seqEstructuraPresupuesto : this._authService.UserValue.seqEstructuraPresupuesto,
          roles : this._authService.UserValue.roles,
          token : this._authService.UserValue.token,
          nombre : this._authService.UserValue.nombre,
          //codigoUnidades : this._authService.UserValue.codigoUnidades
        } 
        

        this._router.navigate(['/home/hall'])
      },
      error: (err) => { console.log(err);
      
                       if (err.status == 401){
                        if(err.error.error){
                          this.errorText = err.error.error
                        }else{
                          this.errorText = 'Credenciales invalidas'

                        }
                      }
                       else if(err.status == 500){this.errorText = 'Error del servidor'}
                       else if(err.name  == 'HttpErrorResponse'){this.errorText = 'Error de conexion'}
                       else {this.errorText = 'Error desconocido'}
                      },
                       
                       
      
    })
  }

}
