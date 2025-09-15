import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pantalla-farmaco',
  templateUrl: './pantalla-farmaco.component.html',
  styleUrl: './pantalla-farmaco.component.css'
})

export class PantallaFarmacoComponent  implements OnInit{

  constructor(private location: Location){}
  ngOnInit(): void {
  }

  regresar(): void {
  this.location.back();
  }

}

