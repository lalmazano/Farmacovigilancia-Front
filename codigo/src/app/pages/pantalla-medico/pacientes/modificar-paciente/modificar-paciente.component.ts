import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PacienteService } from 'src/app/services/api';
import { formatDate } from '@angular/common';
import '@angular/common/locales/global/es-GT';

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrl: './modificar-paciente.component.css'
})
export class ModificarPacienteComponent  implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ModificarPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicio: PacienteService
  ) {}

  ngOnInit(): void {
        if (this.data?.fechaNacimiento && !(this.data.fechaNacimiento instanceof Date)) {
      this.data.fechaNacimiento = new Date(this.data.fechaNacimiento);
    }
  }

guardar(): void {
  const id = this.data.id;
  const entidad: any = {
    dpi: Number(this.data.dpi),
    nombre: this.data.nombre,
      fechaNacimiento: this.data.fechaNacimiento
        ? formatDate(this.data.fechaNacimiento, 'yyyy-MM-dd', 'es-GT') // date-only
        : null,
    genero: this.data.genero,
    contacto: this.data.contacto
  };

  console.log('PUT ID:', id, 'DTO:', entidad);

  this.servicio.apiPacienteIdPut(id, entidad).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Actualizado!',
        text: 'El Paciente ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.dialogRef.close(true); 
    },
    error: () => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al actualizar el Paciente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}

