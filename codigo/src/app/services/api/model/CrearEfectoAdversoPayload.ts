// Igualito a CrearEfectoAdversoDto de tu Swagger
export interface CrearEfectoAdversoPayload {
  idPaciente: number;
  idMedicamento: number;
  fechaReporte: string;        // ISO
  descripcion: string;
  gravedad?: string | null;
  lote: string;
  laboratorio: string;
  registroSanitario?: string | null;
  fechaVencimiento: string;    // ISO
  dosis?: string | null;
  fechaInicioEfecto?: string | null;
  fechaFinEfecto?: string | null;
  viaAdministracion?: string | null;
  medidasTomadas?: string | null;
  suspension?: string | null;  // "S" | "N" (tu backend lo declaró string)
  fechaSuspension?: string | null;
  ajusteDosis?: string | null; // "S" | "N"
  dosisActual?: string | null;
}
