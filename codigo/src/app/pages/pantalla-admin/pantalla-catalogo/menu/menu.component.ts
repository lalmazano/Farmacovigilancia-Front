import { Component, OnInit } from '@angular/core';
import { CardGridItem } from 'src/app/models/card-grid-item.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(private location: Location){}
  items: CardGridItem[] = [
    { title: 'Medicamentos',  routerLink: ['../medicamentos'],  imgSrc: './assets/icons8-website-100.png',   imgAlt: 'Sistema' },
//    { title: 'Ambientes',     routerLink: ['/home/pantalla-catalogo/pantalla-ambiente'],    imgSrc: './assets/icons8-collaboration-100.png', imgAlt: 'Ambiente' },
    
  ];

  ngOnInit(): void {
  }
regresar(): void {
  this.location.back();
}
}
