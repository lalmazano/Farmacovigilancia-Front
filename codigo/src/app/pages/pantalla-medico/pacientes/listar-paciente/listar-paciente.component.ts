import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from 'src/app/services/api/open-services/api';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Paciente } from 'src/app/services/api';
import { CrearPacienteComponent } from '../crear-paciente/crear-paciente.component';
import { ModificarPacienteComponent } from '../modificar-paciente/modificar-paciente.component';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrl: './listar-paciente.component.css'
})
export class ListarPacienteComponent implements OnInit, AfterViewInit {
  columnas: string[] = ['DPI','NOMBRE', 'FECHA_NACIMIENTO', 'GENERO','CONTACTO', 'FECHA_REGISTRO', 'OPCIONES'];
  dataSource = new MatTableDataSource<Paciente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location ,private usuariosService: PacienteService, private cdRef: ChangeDetectorRef, private dialog: MatDialog, public router: Router,public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerListado();
  }

  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.cdRef.detectChanges();
  }

  obtenerListado(): void {
    this.usuariosService.apiPacienteGet().subscribe({
      next: (data) => {
        const adaptados = data.map((u: Paciente) => ({
          id: u.idPaciente,
          dpi: u.dpi,
          nombre: u.nombre,
          fechaNacimiento:  u.fechaNacimiento ? new Date(u.fechaNacimiento).toLocaleDateString() : '',
          genero: u.genero || '',
          contacto: u.contacto || '',
          fechaRegistro: u.fechaRegistro ? new Date(u.fechaRegistro).toLocaleDateString() : '',
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
  const dialogRef = this.dialog.open(CrearPacienteComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {}
    this.obtenerListado();
  });}



  abrirModificacion(usuario: any): void {
  const dialogRef = this.dialog.open(ModificarPacienteComponent, {
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
      this.usuariosService.apiPacienteIdDelete(usuario.id).subscribe(() => {
        Swal.fire('¡Eliminado!', 'El Paciente ha sido eliminado.', 'success');
        this.obtenerListado(); // Refrescar lista
      }, error => {
        Swal.fire('Error', 'No se pudo eliminar el Paciente.', 'error');
      });
    }
  });
}

regresar(): void {
  this.location.back();
}
  
}