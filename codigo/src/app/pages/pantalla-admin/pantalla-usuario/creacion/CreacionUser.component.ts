import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../../services/api/open-services/usuarios.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creacion-user',
  templateUrl: './CreacionUser.component.html',
  styleUrls: ['./CreacionUser.component.css']
})
export class CreacionUserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreacionUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService: UsuariosService
  ) {
     if (!this.data) {
    this.data = {
      nombre: '',
      apellido: '',
      email: '',
      username: '',
      password: '',
      estado: 'A'
    };
  }
  }

  ngOnInit(): void {
  }

guardar(): void {
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

  this.usuariosService.apiUsuariosPost(usuarioUpdateDto).subscribe({
    next: () => {
      Swal.fire({
        title: '¡Creado!',
        text: 'El usuario ha sido Creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.dialogRef.close(true); 
    },
    error: () => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al Crear el usuario.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

}