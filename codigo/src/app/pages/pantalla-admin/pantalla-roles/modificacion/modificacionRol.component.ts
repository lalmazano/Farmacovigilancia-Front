import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolService } from 'src/app/services/api/open-services/rol.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificacion-rol',
  templateUrl: './modificacionRol.component.html',
  styleUrls: ['./modificacionRol.component.css']
})
export class modificacionrolComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<modificacionrolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
  }

guardar(): void {
  const id = this.data.id;
  const rolUpdateDto:any = {
    name: this.data.name,
    description: this.data.description,
    estado: this.data.estado
  };


  this.rolService.apiRolIdPut(id, rolUpdateDto).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Actualizado!',
        text: 'El rol ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.dialogRef.close(true); 
    },
    error: () => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al actualizar el usuario.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}

