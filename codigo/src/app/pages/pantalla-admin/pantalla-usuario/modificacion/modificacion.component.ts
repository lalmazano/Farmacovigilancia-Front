import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../../services/api/open-services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificacion-user',
  templateUrl: './modificacion.component.html',
  styleUrls: ['./modificacion.component.css']
})
export class ModificacionUserComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<ModificacionUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
  }

guardar(): void {
  const id = this.data.id;
  const usuarioUpdateDto:any = {
    nombre: this.data.nombre,
    apellido: this.data.apellido,
    email: this.data.email,
    username: this.data.username,
    estado: this.data.estado
  };

    if (this.data.password && this.data.password.trim() !== '') {
    usuarioUpdateDto.password = this.data.password;
  }
  //console.log('PUT ID:', id, 'DTO:', usuarioUpdateDto);

  this.usuariosService.apiUsuariosIdPut(id, usuarioUpdateDto).subscribe({
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
        text: 'Ocurrió un error al actualizar el usuario.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}

