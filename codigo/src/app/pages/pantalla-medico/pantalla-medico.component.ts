import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pantalla-medico',
  templateUrl: './pantalla-medico.component.html',
  styleUrl: './pantalla-medico.component.css'
})
export class PantallaMedicoComponent implements OnInit{

  constructor(private location: Location){}
  ngOnInit(): void {
  }

  regresar(): void {
  this.location.back();
  }

}

