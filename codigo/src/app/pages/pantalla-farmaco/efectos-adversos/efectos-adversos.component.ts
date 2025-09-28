import { Component, OnInit, ViewChild } from '@angular/core';
import { EfectoAdverso } from './../../../services/api/model/efectoAdverso';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EfectoAdversoService } from 'src/app/services/api';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-efectos-adversos',
  templateUrl: './efectos-adversos.component.html',
  styleUrl: './efectos-adversos.component.css'
})

export class EfectosAdversosFarmacoComponent implements OnInit {
  displayedColumns: string[] = ['id_paciente', 'nombre_paciente', 'nombre_medicamento', 'fecha_reporte', 'descripcion'];
  efectosAdversos: MatTableDataSource<EfectoAdverso> = new MatTableDataSource<EfectoAdverso>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location, private efectoAdversoService: EfectoAdversoService,
    public dialog: MatDialog) {
    Chart.register(...registerables); 
  }

  ngOnInit(): void {
    this.efectosAdversos.filterPredicate = (data, filter) => {
      const dataStr = `${data.idPaciente} ${data.idPacienteNavigation?.nombre} ${data.idMedicamentoNavigation?.nombre} ${this.formatDate(data.fechaReporte)} ${data.descripcion}`;
      return dataStr.toLowerCase().includes(filter);
    };
    this.loadEfectosAdversos();
  }
   
  regresar(): void {
   this.location.back();
  }

  formatDate(date: any): string {
    // Si date ya es un objeto Date, úsalo directamente; de lo contrario, conviértelo
    const parsedDate = (date instanceof Date) ? date : new Date(date);
  
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  loadEfectosAdversos() {
    this.efectoAdversoService.apiEfectoAdversoGet().subscribe((data: EfectoAdverso[]) => {
      this.efectosAdversos.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.efectosAdversos.filter = filterValue.trim().toLowerCase();

    if (this.efectosAdversos.paginator) {
      this.efectosAdversos.paginator.firstPage();
    }
  }

  /*
  openEfectoAdversoDialog(efectoAdverso: any): void {
    this.dialog.open(EfectoAdversoDialogComponent, {
      width: '400px',
      height: '600px',
      data: efectoAdverso
    });
  }
  */
}

