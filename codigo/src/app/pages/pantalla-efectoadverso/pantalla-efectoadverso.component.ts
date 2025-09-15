import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pantalla-efectoadverso',

  templateUrl: './pantalla-efectoadverso.component.html',
  styleUrl: './pantalla-efectoadverso.component.css'
})
export class PantallaEfectoadversoComponent  implements OnInit{

  constructor(private location: Location){}
  ngOnInit(): void {
  }

  regresar(): void {
  this.location.back();
  }

}
