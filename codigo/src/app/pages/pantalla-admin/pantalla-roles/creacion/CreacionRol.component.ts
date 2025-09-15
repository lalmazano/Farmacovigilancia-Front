import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolService } from '../../../../services/api/open-services/rol.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creacion-rol',
  templateUrl: './CreacionRol.component.html',
  styleUrls: ['./CreacionRol.component.css']
})
export class CreacionRolComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreacionRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rolService: RolService
  ) {
     if (!this.data) {
    this.data = {
      noPort: '',
      description: '',
    };
  }
  }

  ngOnInit(): void {
  }

guardar(): void {
  const rolUpdateDto:any = {
    name: this.data.name,
    description: this.data.description,
    estado: this.data.estado
  };
  this.rolService.apiRolPost(rolUpdateDto).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Creado!',
        text: 'El rol ha sido creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.dialogRef.close(true); 
    },
    error: () => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al crear el puerto.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}