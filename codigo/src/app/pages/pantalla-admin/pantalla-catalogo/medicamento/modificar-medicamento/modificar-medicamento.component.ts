import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MedicamentoService } from 'src/app/services/api';

@Component({
  selector: 'app-modificar-medicamento',
  templateUrl: './modificar-medicamento.component.html',
  styleUrl: './modificar-medicamento.component.css'
})

export class ModificarMedicamentoComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ModificarMedicamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService: MedicamentoService
  ) {}

  ngOnInit(): void {
  }

guardar(): void {
  const id = this.data.id;
  const entidad:any = {
    nombre: this.data.nombre,
    composicion: this.data.composicion,
    indicaciones: this.data.indicaciones,
    contraindicaciones: this.data.contraindicaciones
  };

  console.log('PUT ID:', id, 'DTO:', entidad);

  this.usuariosService.apiMedicamentoIdPut(id, entidad).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Actualizado!',
        text: 'El usuario ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.dialogRef.close(true); 
    },
    error: () => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al actualizar el Medicamento.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}

