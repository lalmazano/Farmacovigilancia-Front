import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { EfectoAdversoService, PacienteService } from '../../../services/api/open-services/api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EfectoAdverso, Paciente } from 'src/app/services/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboardmedico.component.html',
  styleUrl: './dashboardmedico.component.css'
})
export class DashboardMedicoComponent implements OnInit, AfterViewInit {
  displayedColumnsPacientes: string[] = ['nombre', 'contacto', 'recetas', 'historial'];
  displayedColumnsEfectos: string[] = ['nombre_paciente', 'nombre_medicamento', 'fecha_reporte', 'descripcion'];

  pacientes = new MatTableDataSource<Paciente>([]);
  efectosAdversos = new MatTableDataSource<EfectoAdverso>([]);
  nuevoPacienteForm: FormGroup;

  @ViewChild('paginatorPacientes') paginatorPacientes!: MatPaginator;
  @ViewChild('paginatorEfectos') paginatorEfectos!: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private efectoAdversoService: EfectoAdversoService,
    private pacienteService: PacienteService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.nuevoPacienteForm = this.fb.group({
      id_paciente: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]], // Validación para 13 dígitos
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      contacto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPacientes();
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

  ngAfterViewInit() {
    this.pacientes.paginator = this.paginatorPacientes;
    this.efectosAdversos.paginator = this.paginatorEfectos;
  }

  loadPacientes() {
    this.pacienteService.apiPacienteGet().subscribe(data => {
      this.pacientes.data = data;
    });
  }

  loadEfectosAdversos() {
    this.efectoAdversoService.apiEfectoAdversoGet().subscribe(data => {
      this.efectosAdversos.data = data;
    });
  }

  crearPaciente() {
    if (this.nuevoPacienteForm.valid) {
      const nuevoPaciente = {
        ...this.nuevoPacienteForm.value,
        id_paciente: Number(this.nuevoPacienteForm.value.id_paciente) // Castear a número
      };

      this.pacienteService.apiPacientePost(nuevoPaciente).subscribe(response => {
        this.loadPacientes();
        this.nuevoPacienteForm.reset();
      });
    }
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
