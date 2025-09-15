import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { ComponentsModule } from '../components/components.module';
import { PantallaEfectoadversoComponent } from '../pages/pantalla-efectoadverso/pantalla-efectoadverso.component';
import { IngresoEfectoadversoComponent } from '../pages/pantalla-efectoadverso/ingreso-efectoadverso/ingreso-efectoadverso.component';

@NgModule({
  declarations: [
    LoginComponent,
    PantallaEfectoadversoComponent,
    IngresoEfectoadversoComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialDesignModule,
    ComponentsModule,
  ]
})
export class AuthModule { }
