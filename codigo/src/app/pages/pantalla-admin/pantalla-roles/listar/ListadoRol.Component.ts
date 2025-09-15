import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { modificacionrolComponent } from '../modificacion/modificacionRol.component';
import Swal from 'sweetalert2';
import { CreacionRolComponent } from '../creacion/CreacionRol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RolDto } from 'src/app/services/api/model/rolDto';
import { RolService } from 'src/app/services/api/open-services/rol.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-listado-rol',
  templateUrl: './ListadoRol.Component.html',
  styleUrls: ['./ListadoRol.Component.css']
})

export class ListadoRolComponent implements OnInit, AfterViewInit {
  columnas: string[] = ['ID','ROL', 'DESCRIPCION', 'ESTATUS', 'OPCIONES'];
  dataSource = new MatTableDataSource<RolDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location,private rolService: RolService, private cdRef: ChangeDetectorRef, private dialog: MatDialog, public router: Router,public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerRoles();
  }

  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.cdRef.detectChanges();
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

  obtenerRoles(): void {
    this.rolService.apiRolGet().subscribe({
      next: (data) => {
        const adaptados = data.map((u: RolDto) => ({
          id: u.idRol,
          name: u.name,
          description: u.description,
          estado: u.estado
        }));
        this.dataSource.data = adaptados;
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }


  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  abrirCreacionRol(): void {
  const dialogRef = this.dialog.open(CreacionRolComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.obtenerRoles();
    }
  });}




  abrirDialogo(rol: any): void {
  const dialogRef = this.dialog.open(modificacionrolComponent, {
    width: '400px',
    data: rol
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.obtenerRoles();
    }
  });}

  confirmarEliminacion(rol: any): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Se eliminará el rol: ${rol.name}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí llamas al servicio de eliminación
      this.rolService.apiRolIdDelete(rol.id).subscribe(() => {
        Swal.fire('¡Eliminado!', 'El rol ha sido eliminado.', 'success');
        this.obtenerRoles(); // Refrescar lista
      }, error => {
        Swal.fire('Error', 'No se pudo eliminar el rol.', 'error');
      });
    }
  });
}

regresar(): void {
  this.location.back();
}
  
}