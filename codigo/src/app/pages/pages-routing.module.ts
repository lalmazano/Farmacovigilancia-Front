import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HallComponent } from './hall/hall.component';
import { PantallaAdminComponent } from './pantalla-admin/pantalla-admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { ModificacionUserComponent } from './pantalla-admin/pantalla-usuario/modificacion/modificacion.component';
import { ListadoUserComponent } from './pantalla-admin/pantalla-usuario/listar/ListadoUser.Component';
import { CreacionUserComponent } from './pantalla-admin/pantalla-usuario/creacion/CreacionUser.component';
import { PantallaUserComponent } from './pantalla-admin/pantalla-usuario/pantalla-user.component';
import { PantallaRolesComponent } from './pantalla-admin/pantalla-roles/pantalla-roles.component';
import { PantallaCatalogoComponent } from './pantalla-admin/pantalla-catalogo/pantalla-catalogo.component';
import { MenuComponent } from './pantalla-admin/pantalla-catalogo/menu/menu.component';
import { modificacionrolComponent } from './pantalla-admin/pantalla-roles/modificacion/modificacionRol.component';
import { ListadoRolComponent } from './pantalla-admin/pantalla-roles/listar/ListadoRol.Component';
import { CreacionRolComponent } from './pantalla-admin/pantalla-roles/creacion/CreacionRol.component';
import { PantallaFarmacoComponent } from './pantalla-farmaco/pantalla-farmaco.component';
import { PantallaReportesComponent } from './pantalla-reportes/pantalla-reportes.component';
import { PantallaMedicoComponent } from './pantalla-medico/pantalla-medico.component';
import { FarmacoGuard } from '../guards/farmaco.guard';
import { DashboardComponent } from './pantalla-farmaco/dashboard/dashboard.component';
import { MedicoGuard } from '../guards/medico.guard';
import { MenuFarmacoComponent } from './pantalla-farmaco/menu-farmaco/menu-farmaco.component';
import { MenuMedicoComponent } from './pantalla-medico/menu-medico/menu-medico.component';
import { DashboardMedicoComponent } from './pantalla-medico/dashboard/dashboardmedico.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: 'hall',
        component: HallComponent
      },
      {
        path: 'pantalla-admin',
        component: PantallaAdminComponent,
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
        ]
      },
      {
        path: 'pantalla-roles',
        component: PantallaRolesComponent,
        children: [
          {
            path: 'modificacion',
            component: modificacionrolComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'creacion',
            component: CreacionRolComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'listado',
            component: ListadoRolComponent,
            canActivate: [AdminGuard]
          },
          { path: '', redirectTo: 'listado', pathMatch: 'full' }
        ]
      },
      {
        path: 'pantalla-catalogo',
        component: PantallaCatalogoComponent,
        children: [
          {
            path: 'menu',
            component: MenuComponent,
            canActivate: [AdminGuard]
          },
          { path: '', redirectTo: 'menu', pathMatch: 'full' }
        ]
      },
      {
        path: 'pantalla-usuario',
        component: PantallaUserComponent,
        children: [
          {
            path: 'modificacion',
            component: ModificacionUserComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'creacion',
            component: CreacionUserComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'usuarios',
            component: ListadoUserComponent,
            canActivate: [AdminGuard]
          },
          { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
        ]
      },
      {
        path: 'pantalla-farmaco',
        component: PantallaFarmacoComponent,
        children: [
          {
            path: 'menu',
            component: MenuFarmacoComponent,
            canActivate: [FarmacoGuard],
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [FarmacoGuard],
          },
          { path: '', redirectTo: 'menu', pathMatch: 'full' }, 
        ]
        
      },
      {
        path: 'pantalla-medico',
        component: PantallaMedicoComponent,
        children: [
          {
            path: 'menu',
            component: MenuMedicoComponent,
            canActivate: [MedicoGuard]
          },
          {
            path: 'dashboard',
            component: DashboardMedicoComponent,
            canActivate: [MedicoGuard]
          },
          { path: '', redirectTo: 'menu', pathMatch: 'full' },
        ]
      },
      {
        path: 'pantalla-reportes',
        component: PantallaReportesComponent,
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
        ]
      },


    ]
  },

  { path: '', redirectTo: 'hall', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule { }
