import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QrDialogComponent } from './qr/qr-dialog.component';


@Component({
  selector: 'app-pantalla-comentarios',
  templateUrl: './pantalla-comentarios.component.html',
  styleUrl: './pantalla-comentarios.component.css'
})
export class PantallaComentariosComponent implements OnInit{

  constructor(private router: Router,private dialog: MatDialog){}
  ngOnInit(): void {
  }

  regresar(): void {
  this.router.navigate(['/home/hall']);
  }

  abrirQr(): void {
  this.dialog.open(QrDialogComponent, { width: '300px' });
}
 
}
