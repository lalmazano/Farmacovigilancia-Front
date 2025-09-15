import { Component, OnInit, ViewChild } from '@angular/core';
import { EfectoAdverso } from 'Servicios/model/efectoAdverso';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EfectoAdversoService, MedicamentoService } from 'src/app/services/api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id_paciente', 'nombre_paciente', 'nombre_medicamento', 'fecha_reporte', 'descripcion'];
  efectosAdversos: MatTableDataSource<EfectoAdverso> = new MatTableDataSource<EfectoAdverso>([]);
  medicamentos = new MatTableDataSource<any>([]); // Fuente de datos para la tabla de medicamentos
  displayedColumnsMedicamentos: string[] = ['nombre', 'composicion', 'fecha_registro'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorMedicamentos', { static: true }) paginatorMedicamentos!: MatPaginator;

  constructor(private efectoAdversoService: EfectoAdversoService, private router: Router,
    public dialog: MatDialog,private medicamentoService: MedicamentoService) {
    Chart.register(...registerables); // Necesario para usar Chart.js
  }

  ngOnInit(): void {
    this.efectosAdversos.filterPredicate = (data, filter) => {
      const dataStr = `${data.idPaciente} ${data.idPacienteNavigation?.nombre} ${data.idMedicamentoNavigation?.nombre} ${this.formatDate(data.fechaReporte)} ${data.descripcion}`;
      return dataStr.toLowerCase().includes(filter);
    };
    this.loadEfectosAdversos();

  }
  ngAfterViewInit() {
    this.efectosAdversos.paginator = this.paginator;
    this.medicamentos.paginator = this.paginatorMedicamentos;
    this.loadMedicamentos();
  }

  loadMedicamentos() {
    this.medicamentoService.apiMedicamentoGet().subscribe(data => {
      this.medicamentos.data = data;
      this.medicamentos.paginator = this.paginatorMedicamentos;
    });
  }

/*
  openAddMedicamentoDialog(): void {
    const dialogRef = this.dialog.open(AddMedicamentoDialogComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMedicamentos(); // Recargar la lista de medicamentos si se agregó uno nuevo
      }
    });
  }
*/
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
      this.createCharts(data);
    });
  }

  loadEfectosAdversos2() {
    this.efectoAdversoService.apiEfectoAdversoGet().subscribe(data => {
      this.medicamentos.data = data;
      this.medicamentos.paginator = this.paginatorMedicamentos;
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

  createCharts(data: any[]) {
    // Contar los efectos adversos por gravedad
    const gravedadCounts = data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.gravedad] = (acc[item.gravedad] || 0) + 1;
        return acc;
    }, {});

    // Contar los efectos adversos por medicamento
    const medicamentoCounts = data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.idMedicamentoNavigation?.nombre] = (acc[item.idMedicamentoNavigation?.nombre] || 0) + 1;
        return acc;
    }, {});

    // Ordenar medicamentos y tomar el top 10
    const topMedicamentos = Object.entries(medicamentoCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const topMedicamentoLabels = topMedicamentos.map(m => m[0]);
    const topMedicamentoValues = topMedicamentos.map(m => m[1]);

    // Contar los efectos adversos por paciente
    const pacienteCounts = data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.idPacienteNavigation?.nombre] = (acc[item.idPacienteNavigation?.nombre] || 0) + 1;
        return acc;
    }, {});

    // Ordenar pacientes y tomar el top 5
    const topPacientes = Object.entries(pacienteCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const topPacienteLabels = topPacientes.map(p => p[0]);
    const topPacienteValues = topPacientes.map(p => p[1]);

    // Contar los efectos adversos por vía de administración
    const viaCounts = data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.viaAdministracion] = (acc[item.viaAdministracion] || 0) + 1;
        return acc;
    }, {});

    // Gráfica de Gravedad (Pie)
    new Chart('gravedadChart', {
        type: 'pie',
        data: {
            labels: Object.keys(gravedadCounts),
            datasets: [{
                label: 'Distribución por Gravedad',
                data: Object.values(gravedadCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Gráfica de Medicamentos (Top Medicamentos)
    new Chart('medicamentoChart', {
        type: 'bar',
        data: {
            labels: topMedicamentoLabels,
            datasets: [{
                label: 'Top Medicamentos con más Reportes',
                data: topMedicamentoValues,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 255, 0.6)',
                    'rgba(255, 69, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(255, 69, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });

    // Gráfica de Pacientes (Top 5 Pacientes con más Reportes - Barras Horizontales)
   // Gráfica de Pacientes (Top 5 Pacientes con más Reportes - Barras Horizontales)
new Chart('pacienteChart', {
  type: 'bar',
  data: {
      labels: topPacienteLabels,
      datasets: [{
          label: 'Top Pacientes con más Reportes',
          data: topPacienteValues,
          backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)',
              'rgba(83, 102, 255, 0.6)'
          ],
          borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
              'rgba(83, 102, 255, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      responsive: true,
      maintainAspectRatio: false, // Asegúrate de que esto esté en false
      indexAxis: 'y',  // Esto hace que la gráfica sea horizontal
      scales: {
          x: {
              beginAtZero: true,
          }
      },
      plugins: {
          legend: {
              position: 'top',
          }
      }
  }
});


    // Gráfica de Vía de Administración (Doughnut)
new Chart('viaChart', {
  type: 'doughnut',
  data: {
      labels: Object.keys(viaCounts),
      datasets: [{
          label: 'Distribución por Vía de Administración',
          data: Object.values(viaCounts),
          backgroundColor: [
              'rgba(75, 192, 192, 0.8)',  // Verde
              'rgba(153, 102, 255, 0.8)', // Púrpura
              'rgba(255, 159, 64, 0.8)',  // Naranja
              'rgba(199, 199, 199, 0.8)', // Gris
              'rgba(83, 102, 255, 0.8)',  // Azul Oscuro
              'rgba(255, 69, 0, 0.8)',    // Rojo Oscuro
              'rgba(255, 99, 132, 0.8)',  // Rojo
              'rgba(54, 162, 235, 0.8)',  // Azul
              'rgba(255, 206, 86, 0.8)',  // Amarillo
          ],
          borderColor: [
              'rgba(75, 192, 192, 1)',    // Borde Verde
              'rgba(153, 102, 255, 1)',   // Borde Púrpura
              'rgba(255, 159, 64, 1)',    // Borde Naranja
              'rgba(199, 199, 199, 1)',   // Borde Gris
              'rgba(83, 102, 255, 1)',    // Borde Azul Oscuro
              'rgba(255, 69, 0, 1)',      // Borde Rojo Oscuro
              'rgba(255, 99, 132, 1)',    // Borde Rojo
              'rgba(54, 162, 235, 1)',    // Borde Azul
              'rgba(255, 206, 86, 1)',    // Borde Amarillo
          ],
          borderWidth: 1
      }]
  },
  options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              position: 'top',
          }
      }
  }
});

}
}
