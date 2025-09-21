import { Component, OnInit } from '@angular/core';
import { CardGridItem } from 'src/app/models/card-grid-item.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-farmaco',
  templateUrl: './menu-farmaco.component.html',
  styleUrl: './menu-farmaco.component.css'
})
export class MenuFarmacoComponent implements OnInit {
  constructor(private location: Location){}
  items: CardGridItem[] = [
    { title: 'Dashboard ',  routerLink: ['../dashboard'],  imgSrc: './assets/icons8-website-100.png',   imgAlt: 'dashboard' },
    { title: 'Medicamentos',     routerLink: ['../medicamentos'],    imgSrc: './assets/icons8-collaboration-100.png', imgAlt: 'medicamentos' },
    { title: 'Efectos Adversos',     routerLink: ['../efectos'],    imgSrc: './assets/icons8-collaboration-100.png', imgAlt: 'medicamentos' },
    
  ];

  ngOnInit(): void {
  }
regresar(): void {
  this.location.back();
}
}
