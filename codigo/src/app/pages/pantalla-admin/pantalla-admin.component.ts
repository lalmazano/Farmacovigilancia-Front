import { Component, OnInit } from '@angular/core';
import { CardGridItem } from '../../models/card-grid-item.model';


@Component({
  selector: 'app-pantalla-admin',
  templateUrl: './pantalla-admin.component.html',
  styleUrls: ['./pantalla-admin.component.css']
})
export class PantallaAdminComponent implements OnInit {
  constructor(){}
  items: CardGridItem[] = [
    { title: 'Usuarios',  routerLink: ['/home/pantalla-usuario'],  imgSrc: './assets/icons8-users-100.png',   imgAlt: 'Usuarios' },
    { title: 'Roles',     routerLink: ['/home/pantalla-roles'],    imgSrc: './assets/3463112.png',           imgAlt: 'Roles' },
    { title: 'Catálogo',  routerLink: ['/home/pantalla-catalogo'], imgSrc: './assets/icons8-catalog-100.png', imgAlt: 'Catálogo' },
    // { title: 'Docs', href: 'https://tu-dominio/docs', target: '_blank', imgSrc: './assets/docs.png' }
  ];

  ngOnInit(): void {
  }

}
