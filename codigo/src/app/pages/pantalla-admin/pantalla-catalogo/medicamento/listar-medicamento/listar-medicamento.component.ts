import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoService } from 'src/app/services/api/open-services/api';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Medicamento } from 'src/app/services/api';
import { CrearMedicamentoComponent } from '../crear-medicamento/crear-medicamento.component';
import { ModificarMedicamentoComponent } from '../modificar-medicamento/modificar-medicamento.component';


@Component({
  selector: 'app-listar-medicamento',
  templateUrl: './listar-medicamento.component.html',
  styleUrl: './listar-medicamento.component.css'
})

export class ListarMedicamentoComponent implements OnInit, AfterViewInit {
  columnas: string[] = ['ID_MEDICAMENTO ','NOMBRE', 'COMPOSICION', 'INDICACIONES','CONTRAINDICACIONES', 'FECHA_REGISTRO', 'OPCIONES'];
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

  abrirCreacion(): void {
  const dialogRef = this.dialog.open(CrearMedicamentoComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {}
  });}



  abrirModificacion(usuario: any): void {
  const dialogRef = this.dialog.open(ModificarMedicamentoComponent, {
    width: '500px',
    data: usuario
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      // Actualizar tabla o volver a cargar datos
    }
  });}

  confirmarEliminacion(usuario: any): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Se eliminará el usuario: ${usuario.nombre} ${usuario.apellido}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al servicio de eliminación
      this.usuariosService.apiMedicamentoIdDelete(usuario.id).subscribe(() => {
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        this.obtenerListado(); // Refrescar lista
      }, error => {
        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
      });
    }
  });
}

regresar(): void {
  this.location.back();
}
  
}