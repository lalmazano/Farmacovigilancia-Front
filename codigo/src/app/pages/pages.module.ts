import { NgModule } from '@angular/core';
import { CommonModule, IMAGE_CONFIG } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { HomeComponent } from './home/home.component';
import { HallComponent } from './hall/hall.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { QuillModule } from 'ngx-quill';
import { NgxEditorModule } from 'ngx-editor';
import { PantallaAdminComponent } from './pantalla-admin/pantalla-admin.component';
import { ModificacionUserComponent } from './pantalla-admin/pantalla-usuario/modificacion/modificacion.component';
import { ListadoUserComponent } from './pantalla-admin/pantalla-usuario/listar/ListadoUser.Component';
import { CreacionUserComponent } from './pantalla-admin/pantalla-usuario/creacion/CreacionUser.component';
import { PantallaUserComponent } from './pantalla-admin/pantalla-usuario/pantalla-user.component';
import { PantallaRolesComponent } from './pantalla-admin/pantalla-roles/pantalla-roles.component';
import { PantallaCatalogoComponent } from './pantalla-admin/pantalla-catalogo/pantalla-catalogo.component';
import { CardGridComponent } from './Utilitarios/card-grid/card-grid.component';
import { MenuComponent } from './pantalla-admin/pantalla-catalogo/menu/menu.component';
import { ListadoRolComponent } from './pantalla-admin/pantalla-roles/listar/ListadoRol.Component';
import { CreacionRolComponent } from './pantalla-admin/pantalla-roles/creacion/CreacionRol.component';
import { modificacionrolComponent } from './pantalla-admin/pantalla-roles/modificacion/modificacionRol.component';
import { PantallaFarmacoComponent } from './pantalla-farmaco/pantalla-farmaco.component';
import { PantallaMedicoComponent } from './pantalla-medico/pantalla-medico.component';
import { DashboardComponent } from './pantalla-farmaco/dashboard/dashboard.component';
import { MenuFarmacoComponent } from './pantalla-farmaco/menu-farmaco/menu-farmaco.component';
import { MenuMedicoComponent } from './pantalla-medico/menu-medico/menu-medico.component';
import { DashboardMedicoComponent } from './pantalla-medico/dashboard/dashboardmedico.component';
import { MedicamentoComponent } from './pantalla-admin/pantalla-catalogo/medicamento/medicamento.component';
import { ListarMedicamentoComponent } from './pantalla-admin/pantalla-catalogo/medicamento/listar-medicamento/listar-medicamento.component';
import { CrearMedicamentoComponent } from './pantalla-admin/pantalla-catalogo/medicamento/crear-medicamento/crear-medicamento.component';
import { ModificarMedicamentoComponent } from './pantalla-admin/pantalla-catalogo/medicamento/modificar-medicamento/modificar-medicamento.component';
import { MedicamentoFarmacoComponent } from './pantalla-farmaco/medicamento/medicamento-farmaco.component';
import { ListarMedicamentoFarmacoComponent } from './pantalla-farmaco/medicamento/listar-medicamento/listar-medicamento.component';
import { EfectosAdversosFarmacoComponent } from './pantalla-farmaco/efectos-adversos/efectos-adversos.component';
import { EfectosAdversosMedicoComponent } from './pantalla-medico/efectos-adversos/efectos-adversos.component';
import { PacientesComponent } from './pantalla-medico/pacientes/pacientes.component';
import { ListarPacienteComponent } from './pantalla-medico/pacientes/listar-paciente/listar-paciente.component';
import { CrearPacienteComponent } from './pantalla-medico/pacientes/crear-paciente/crear-paciente.component';
import { ModificarPacienteComponent } from './pantalla-medico/pacientes/modificar-paciente/modificar-paciente.component';
import { VisorReportComponent } from './pantalla-reportes/VisorReport/VisorReport.component';
import { PantallaReportesComponent } from './pantalla-reportes/pantalla-reportes.component';

@NgModule({
  declarations: [
    HomeComponent,
    HallComponent,
    PageNotFoundComponent, 
    AccessDeniedComponent,
    PantallaUserComponent,
    PantallaAdminComponent,
    ModificacionUserComponent,
    ListadoUserComponent,
    CreacionUserComponent,
    PantallaRolesComponent,
    PantallaCatalogoComponent,
    CardGridComponent,
    MenuComponent,
    ListadoRolComponent,
    CreacionRolComponent,
    modificacionrolComponent,
    PantallaFarmacoComponent,
    PantallaMedicoComponent,
    VisorReportComponent,
    DashboardComponent,
    DashboardMedicoComponent,
    MenuFarmacoComponent,
    MenuMedicoComponent,
    MedicamentoComponent,
    ListarMedicamentoComponent,
    CrearMedicamentoComponent,
    ModificarMedicamentoComponent,
    MedicamentoFarmacoComponent,
    ListarMedicamentoFarmacoComponent,
    EfectosAdversosFarmacoComponent,
    EfectosAdversosMedicoComponent,
    PacientesComponent,
    ListarPacienteComponent,
    CrearPacienteComponent,
    ModificarPacienteComponent,
    PantallaReportesComponent,

  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    QuillModule,
    NgxEditorModule,
    MaterialDesignModule,
  ],
})
export class PagesModule { }
