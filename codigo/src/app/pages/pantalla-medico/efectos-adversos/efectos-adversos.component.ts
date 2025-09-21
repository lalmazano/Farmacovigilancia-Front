import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EfectoAdversoService, PacienteService } from '../../../services/api/open-services/api';
import { MatDialog } from '@angular/material/dialog';
import { EfectoAdverso, Paciente } from 'src/app/services/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-efectos-adversos',
  templateUrl: './efectos-adversos.component.html',
  styleUrl: './efectos-adversos.component.css'
})
export class EfectosAdversosMedicoComponent implements OnInit, AfterViewInit {
  displayedColumnsEfectos: string[] = ['nombre_paciente', 'nombre_medicamento', 'fecha_reporte', 'descripcion'];

  efectosAdversos = new MatTableDataSource<EfectoAdverso>([]);

  @ViewChild('paginatorEfectos') paginatorEfectos!: MatPaginator;
  constructor(
    private location: Location,
    private efectoAdversoService: EfectoAdversoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.efectosAdversos.filterPredicate = (data, filter) => {
      const filterValue = filter.trim().toLowerCase();

      // Convertimos la fecha a un string en el formato dd/MM/yyyy
      const formattedDate = this.formatDate(data.fechaReporte);
      // Creamos una cadena con todos los campos que queremos filtrar
      const dataStr = `${data.idPacienteNavigation?.nombre} ${data.idMedicamentoNavigation?.nombre} ${formattedDate} ${data.descripcion}`.toLowerCase();

      return dataStr.includes(filterValue);
  };
    this.loadEfectosAdversos();
  }

  formatDate(date: any): string {
    const parsedDate = (date instanceof Date) ? date : new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.efectosAdversos.filter = filterValue.trim().toLowerCase();

  if (this.efectosAdversos.paginator) {
    this.efectosAdversos.paginator.firstPage();
  }
}
  regresar(): void {
   this.location.back();
  }

  ngAfterViewInit() {
    this.efectosAdversos.paginator = this.paginatorEfectos;
  }

  loadEfectosAdversos() {
    this.efectoAdversoService.apiEfectoAdversoGet().subscribe(data => {
      this.efectosAdversos.data = data;
    });
  }

/*
  openPacienteDialog(paciente: any): void {
    this.dialog.open(PacienteDialogComponent, {
      width: '400px',
      height: '340px',
      data: paciente
    });
  }

  openEfectoAdversoDialog(efectoAdverso: any): void {
    this.dialog.open(EfectoAdversoDialogComponent, {
      width: '400px',
      height: '600px',
      data: efectoAdverso
    });
  }

  verRecetas(paciente: any) {
    this.dialog.open(RecetasDialogComponent, {
      width: '850px',
      //height: '400px',
      maxWidth: 'none', // Asegura que no se aplique un maxWidth predeterminado
      data: { id_paciente: paciente.id_paciente }
    });
  }

  addReceta(paciente: any) {
    const medicoId = localStorage.getItem('medicoId'); // Recupera el ID del médico desde el localStorage
    console.log(medicoId)
    const dialogRef = this.dialog.open(AddRecetaDialogComponent, {
      width: '600px',
      height: '500px',
      data: {
        id_paciente: paciente.id_paciente,
        id_medico: medicoId // Pasa el ID del médico al diálogo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Receta creada exitosamente');
      }
    });
  }

  verHistorial(paciente: any) {
    this.dialog.open(HistorialDialogComponent, {
      width: '850px',
      maxWidth: 'none',
      data: { id_paciente: paciente.id_paciente }
    });
  }

  addHistorial(paciente: any) {
    this.dialog.open(AddHistorialDialogComponent, {
      width: '600px',
      data: { id_paciente: paciente.id_paciente }  // Envía el id_paciente como parte de los datos
    });
  }

*/
}
