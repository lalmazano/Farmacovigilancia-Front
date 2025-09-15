import { Component, HostBinding, Inject, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { connect, map, shareReplay, single } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';

import { NavItemModel } from 'src/app/models/nav-item.model';
import { NavMenuService } from 'src/app/services/utils/nav-menu.service';
import { AuthenticacionService } from 'src/app/services/utils/authenticacion.service';
import { UserModel } from 'src/app/models/UserModel';

import * as signalR from '@microsoft/signalr'
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public dark_theme: boolean;
  public nav_list: NavItemModel[];
  public user: UserModel
  public hayNotificacion : boolean;
  public listadoNotificaciones : any[]
  public isLoading:boolean;
  private suscriptionSpinner: Subscription | undefined;

  @HostBinding('class')
  get themeMode() {
    return this.dark_theme ? 'dark-theme' : 'light-theme';
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private _navMenuService: NavMenuService,
    private ventanaModal: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private _router: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2,
    private _authService:AuthenticacionService, private _snackBar : MatSnackBar,
    private _spinnerService:LoadingSpinnerService,
  ) {
    this.dark_theme = false;
    this.nav_list = [];
    this.user = this._authService.UserValue
    this.hayNotificacion = false;
    this.listadoNotificaciones = [];
    this.isLoading = true;
    this.suscriptionSpinner = this._spinnerService.getLoading()
    ?.subscribe({
      next:val =>{
        // console.log('next', val)
        // setTimeout(() => {
          this.isLoading = val
        // }, 500);
      }
    })
  }

  ngOnInit() {
    let host_class = 'light-theme'
    const theme_preference = sessionStorage.getItem('theme-mode');
    if (theme_preference != null) {
      this.dark_theme = JSON.parse(theme_preference)
      host_class = this.dark_theme ? 'dark-theme' : 'light-theme';
    }
    this.renderer.setAttribute(this.document.body, 'class', host_class);

    this.fillNavList() 

      
  }

  public toogleTheme() {
    this.dark_theme = !this.dark_theme;
    sessionStorage.setItem('theme-mode', String(this.dark_theme));
    const host_class = this.dark_theme ? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', host_class)
  }

  public cerrarSesion() {
    Swal.fire({
      title:'¿Desea salir del sistema?',
      icon:'question',
      showCancelButton:true,
      cancelButtonColor:'red',
      cancelButtonText:'No',
      confirmButtonColor:'green',
      confirmButtonText:'Si'
    }).then(res =>{
      if(res.isConfirmed){
        this._authService.logOut();
      }
    });
  }

  private fillNavList() {
    const service_nav_list = this._navMenuService.getItemsByRol(this.user.roles);
    this.nav_list = service_nav_list;
  }

}
