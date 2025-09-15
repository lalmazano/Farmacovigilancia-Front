export interface UsuarioDto {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  estado: string; 
  roles?: Array<string>;
  createdAt?: string;
  updatedAt?: string;

}