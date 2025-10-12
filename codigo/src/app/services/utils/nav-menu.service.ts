import { Injectable } from '@angular/core';
import { Roles } from 'src/app/guards/roles';
import { NavItemModel } from 'src/app/models/nav-item.model';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

  private nav_list: NavItemModel[];

  constructor() {
    this.nav_list = [];
    this.nav_list.push(new NavItemModel(1, 'Administracion', '/pantalla-admin', [Roles.administrador], 'admin_panel_settings'));
    this.nav_list.push(new NavItemModel(2, 'Famacologia', '/pantalla-farmaco', [Roles.administrador, Roles.Farmaco], 'science'));
    this.nav_list.push(new NavItemModel(3, 'Medicos', '/pantalla-medico', [Roles.administrador, Roles.Medico], 'medical_services'));    
    //this.nav_list.push(new NavItemModel(4, 'Historial', '/Historial', [Roles.administrador, Roles.Medico, Roles.Farmaco], 'history'));
    this.nav_list.push(new NavItemModel(4, 'Reportes', '/pantalla-reportes', [Roles.administrador, Roles.Medico, Roles.Farmaco, Roles.Reporte], 'reports'));
    this.nav_list.push(new NavItemModel(5, 'Comentarios', '/pantalla-comentarios', [Roles.administrador, Roles.Medico, Roles.Farmaco,Roles.Reporte], 'chat  '));
  }

  public getAllItems(): NavItemModel[] {
    return this.nav_list;
  }

  public getItemsByRol(roles: string[]): NavItemModel[] {
    const new_nav_list: NavItemModel[] = [];
    roles.forEach(user_rol => {
      this.nav_list.forEach((item: NavItemModel) => {
        if (item.roles.find(item_rol => item_rol === user_rol) && !new_nav_list.find(({ id }) => id === item.id)) {
          new_nav_list.push(item);
        }
      });
    });
    return new_nav_list;
  }

  public getModificacionIcon() {
    return ''
  }
}
