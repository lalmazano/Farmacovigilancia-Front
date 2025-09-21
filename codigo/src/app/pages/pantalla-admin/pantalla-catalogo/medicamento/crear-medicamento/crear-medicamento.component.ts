import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicamentoService } from 'src/app/services/api'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-medicamento',
  templateUrl: './crear-medicamento.component.html',
  styleUrl: './crear-medicamento.component.css'
})
export class CrearMedicamentoComponent  implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CrearMedicamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService: MedicamentoService
  ) {
     if (!this.data) {
          this.data = {
            nombre: '',
            composicion: '',
            indicaciones: '',
            contraindicaciones: ''          
          };
  }
  }

  ngOnInit(): void {
  }

guardar(): void {
  const entidad:any = {
    nombre: this.data.nombre,
    composicion: this.data.composicion,
    indicaciones: this.data.indicaciones,
    contraindicaciones: this.data.contraindicaciones
  };

  this.usuariosService.apiMedicamentoPost(entidad).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Creado!',
        text: 'El Medicamento ha sido Creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.dialogRef.close(true); 
    },
    error: () => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al Crear el Medicamento.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}
