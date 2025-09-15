import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pantalla-reportes',
  templateUrl: './pantalla-reportes.component.html',
  styleUrl: './pantalla-reportes.component.css'
})
export class PantallaReportesComponent implements OnInit{

  constructor(private location: Location){}
  ngOnInit(): void {
  }

  regresar(): void {
  this.location.back();
  }

}
