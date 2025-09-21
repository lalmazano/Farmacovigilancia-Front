import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacienteService } from 'src/app/services/api'; 
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import '@angular/common/locales/global/es-GT';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrl: './crear-paciente.component.css'
})
export class CrearPacienteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CrearPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService: PacienteService
  ) {
     if (!this.data) {
          this.data = {
            nombre: '',
            dpi:0,
            genero: '',
            contacto: '',
            fechaNacimiento: ''          
          };
  }
  }

  ngOnInit(): void {
  }

guardar(): void {
  const entidad: any = {
    dpi: Number(this.data.dpi),
    nombre: this.data.nombre,
      fechaNacimiento: this.data.fechaNacimiento
        ? formatDate(this.data.fechaNacimiento, 'yyyy-MM-dd', 'es-GT') // date-only
        : null,
    genero: this.data.genero,
    contacto: this.data.contacto
  };


  this.usuariosService.apiPacientePost(entidad).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Creado!',
        text: 'Paciente ha sido Creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.dialogRef.close(true); 
    },
    error: () => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al Crear el Paciente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}
