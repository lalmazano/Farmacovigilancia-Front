import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoService } from 'src/app/services/api/open-services/api';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Medicamento } from 'src/app/services/api';


@Component({
  selector: 'app-listar-medicamentofarmaco',
  templateUrl: './listar-medicamento.component.html',
  styleUrl: './listar-medicamento.component.css'
})

export class ListarMedicamentoFarmacoComponent implements OnInit, AfterViewInit {
  columnas: string[] = ['ID_MEDICAMENTO ','NOMBRE', 'COMPOSICION', 'INDICACIONES','CONTRAINDICACIONES', 'FECHA_REGISTRO',];
  dataSource = new MatTableDataSource<Medicamento>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location ,private usuariosService: MedicamentoService, private cdRef: ChangeDetectorRef, private dialog: MatDialog, public router: Router,public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerListado();
  }

  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.cdRef.detectChanges();
  }

  obtenerListado(): void {
    this.usuariosService.apiMedicamentoGet().subscribe({
      next: (data) => {
        const adaptados = data.map((u: Medicamento) => ({
          id: u.idMedicamento,
          nombre: u.nombre,
          composicion: u.composicion,
          indicaciones: u.indicaciones || '',
          contraindicaciones: u.contraindicaciones || '',
          estado: u.fechaRegistro ? new Date(u.fechaRegistro).toLocaleDateString() : '',
        }));
        this.dataSource.data = adaptados;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }


  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

regresar(): void {
  this.location.back();
}
  
}