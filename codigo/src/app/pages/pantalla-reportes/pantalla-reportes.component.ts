import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReportesService } from '../../services/api/open-services/reportes.service';
import { VisorReportComponent } from './VisorReport/VisorReport.component';
import { Observable } from 'rxjs';

type ItemRoute = {
  type: 'route';
  title: string;
  imgSrc: string;
  imgAlt: string;
  description?: string;
  routerLink: string | string[];
};

type ItemReport = {
  type: 'report';
  title: string;
  imgSrc: string;
  imgAlt: string;
  description?: string;
  reportId:  'reporte1' | 'reporte2' | 'reporte3' | 'reporte4' | 'reporte5' | 'reporte6';
};

type DashboardItem = ItemRoute | ItemReport;

@Component({
  selector: 'app-pantalla-reportes',
  templateUrl: './pantalla-reportes.component.html',
  styleUrl: './pantalla-reportes.component.css' 
})

export class PantallaReportesComponent implements OnInit {

  items: DashboardItem[] = [
    {
      type: 'report',
      title: 'Consolidado Por Medicamento',
      reportId: 'reporte1',
      imgSrc: './assets/icons8-collaboration-100.png',
      imgAlt: '',
      description: 'Reporte Consolidado  por Medicamento.'
    },
    {
      type: 'report',
      title: 'Consolidado Efectos Adversos',
      reportId: 'reporte2',
      imgSrc: './assets/icons8-collaboration-100.png',
      imgAlt: '',
      description: 'Reporte Consolidado Por Efectos Adversos.'
    },
    {
      type: 'report',
      title: 'Reporte Farmacólogos',
      reportId: 'reporte3',
      imgSrc: './assets/icons8-collaboration-100.png',
      imgAlt: '',
      description: 'Consolidado Por Medicamento.'
    },
    {
      type: 'report',
      title: 'Reporte Médicos',
      reportId: 'reporte4',
      imgSrc: './assets/icons8-collaboration-100.png',
      imgAlt: '',
      description: 'Reporte de Médicos.'
    },
    {
      type: 'report',
      title: 'Reporte Pacientes',
      reportId: 'reporte5',
      imgSrc: './assets/icons8-collaboration-100.png',
      imgAlt: '',
      description: 'Reporte Consolidado de Pacientes.'
    },
    {
      type: 'report',
      title: 'Reporte Recetas',
      reportId: 'reporte6',
      imgSrc: './assets/icons8-collaboration-100.png',
      imgAlt: '',
      description: 'Reporte de Recetas.'
    },  
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {}

  onItemClick(item: DashboardItem): void {
    if (item.type === 'route') {
      const link = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
      this.router.navigate(link);
      return;
    }
    // type === 'report'
    this.fetchReport(item.reportId)?.subscribe({
      next: (res: { reporte: string }) => {
        this.dialog.open(VisorReportComponent, {
          width: '50vw',
          height: '80vh',
          data: { base64: res.reporte }
        });
      },
      error: err => console.error('Error al cargar el reporte', err)
    });
  }

  private fetchReport(id: ItemReport['reportId']): Observable<{ reporte: string }> | null {
    switch (id) {
      case 'reporte1':
        return this.reportesService.apiReportesGetReportEfectoAdversoxMedicamentoGet('body');
      case 'reporte2':
        return this.reportesService.apiReportesGetReportEfectosAdversosGet('body'); 
      case 'reporte3':
        return this.reportesService.apiReportesGetReportFarmacologosGet('body'); 
      case 'reporte4':
        return this.reportesService.apiReportesGetReportMedicosGet('body'); 
      case 'reporte5':
        return this.reportesService.apiReportesGetReportPacientesGet('body');
      case 'reporte6':
        return this.reportesService.apiReportesGetReportRecetasGet('body'); 
      default:
        return null;
    }
  }
}