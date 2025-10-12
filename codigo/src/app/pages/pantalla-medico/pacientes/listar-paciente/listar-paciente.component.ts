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

type PacienteRow = {
  id: number;
  dpi: string;
  nombre: string;
  fechaNacimiento: Date | null;
  genero: string;
  contacto: string;
  fechaRegistro: Date | null;
};

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit, AfterViewInit {
  columnas: string[] = ['DPI','NOMBRE', 'FECHA_NACIMIENTO', 'GENERO','CONTACTO', 'FECHA_REGISTRO', 'OPCIONES'];
  dataSource = new MatTableDataSource<PacienteRow>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private location: Location,
    private usuariosService: PacienteService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerListado();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdRef.detectChanges();
  }

  private parseToDate(v: any): Date | null {
    if (!v) return null;
    if (v instanceof Date) return isNaN(v.getTime()) ? null : v;

    if (typeof v === 'string') {
      const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (m) {
        const d = Number(m[1]), mm = Number(m[2]), y = Number(m[3]);
        const dt = new Date(y, mm - 1, d);
        return isNaN(dt.getTime()) ? null : dt;
      }
      const dt = new Date(v);
      return isNaN(dt.getTime()) ? null : dt;
    }

    const dt = new Date(v);
    return isNaN(dt.getTime()) ? null : dt;
  }

  obtenerListado(): void {
    this.usuariosService.apiPacienteGet().subscribe({
      next: (data) => {
        const adaptados: PacienteRow[] = data.map((u: Paciente) => ({
          id: Number(u.idPaciente), // <-- forzamos number
          dpi: u.dpi,
          nombre: u.nombre,
          fechaNacimiento: this.parseToDate(u.fechaNacimiento),
          genero: u.genero || '',
          contacto: u.contacto || '',
          fechaRegistro: this.parseToDate(u.fechaRegistro),
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

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerListado();
    });
  }

  abrirModificacion(usuario: PacienteRow): void {
    const dialogRef = this.dialog.open(ModificarPacienteComponent, {
      width: '500px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        // this.obtenerListado();
      }
    });
  }

  confirmarEliminacion(usuario: PacienteRow): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el usuario: ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si tu cliente generado usa un parámetro "id: number" directo:
        this.usuariosService.apiPacienteIdDelete(usuario.id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'El Paciente ha sido eliminado.', 'success');
          this.obtenerListado();
        }, () => {
          Swal.fire('Error', 'No se pudo eliminar el Paciente.', 'error');
        });
      }
    });
  }

  regresar(): void {
    this.location.back();
  }
}
