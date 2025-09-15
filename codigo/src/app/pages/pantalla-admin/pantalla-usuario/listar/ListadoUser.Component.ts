import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from 'src/app/services/api/open-services/usuarios.service'; // Ajustar ruta según tu estructura
import { UsuarioDto } from '../../../../services/api/model/UsuarioDto'; // Ajustar ruta y modelo si cambia
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModificacionUserComponent } from '../modificacion/modificacion.component';
import Swal from 'sweetalert2';
import { CreacionUserComponent } from '../creacion/CreacionUser.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-listado-user',
  templateUrl: './ListadoUser.Component.html',
  styleUrls: ['./ListadoUser.Component.css']
})

export class ListadoUserComponent implements OnInit, AfterViewInit {
  columnas: string[] = ['ID','NOMBRE', 'APELLIDO', 'USERNAME','CORREO', 'ESTATUS','Roles','CREACION', 'OPCIONES'];
  dataSource = new MatTableDataSource<UsuarioDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location ,private usuariosService: UsuariosService, private cdRef: ChangeDetectorRef, private dialog: MatDialog, public router: Router,public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.cdRef.detectChanges();
  }

  obtenerUsuarios(): void {
    this.usuariosService.apiUsuariosGet().subscribe({
      next: (data) => {
        const adaptados = data.map((u: UsuarioDto) => ({
          id: u.id,
          username: u.username,
          email: u.email,
          nombre: u.nombre || '',
          apellido: u.apellido || '',
          estado: u.estado,
          roles: u.roles || [],
          createdAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '',
          updatedAt: u.updatedAt ? new Date(u.updatedAt).toLocaleDateString() : '',

        }));
        this.dataSource.data = adaptados;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  traducirEstado(valor: string): string {
  switch (valor) {
    case 'A':
      return 'Activo';
    case 'I':
      return 'Inactivo';
    default:
      return valor;
  }
}

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  abrirCreacionuser(): void {
  const dialogRef = this.dialog.open(CreacionUserComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {}
  });}


  asignaRol(usuario:any):void{}

  abrirDialogo(usuario: any): void {
  const dialogRef = this.dialog.open(ModificacionUserComponent, {
    width: '400px',
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
      this.usuariosService.apiUsuariosIdDelete(usuario.id).subscribe(() => {
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        this.obtenerUsuarios(); // Refrescar lista
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