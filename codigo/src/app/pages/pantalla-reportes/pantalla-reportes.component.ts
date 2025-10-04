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
  reportId:  'gitlab-all' | 'gitlab' | 'gitlab-blocked' | 'incidencias' | 'publicaciones' | 'software';
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
      title: 'Usuarios GitLab (Todos)',
      reportId: 'gitlab-all',
      imgSrc: './assets/icons8-gitlab-480.png',
      imgAlt: 'Reporte GitLab Bloqueados',
      description: 'Listado de todos los usuarios  en GitLab.'
    },
    {
      type: 'report',
      title: 'Usuarios GitLab (Activos)',
      reportId: 'gitlab',
      imgSrc: './assets/icons8-gitlab-480.png',
      imgAlt: 'Reporte GitLab',
      description: 'Listado de usuarios activos en GitLab.'
    },
    {
      type: 'report',
      title: 'Usuarios GitLab (Bloqueados)',
      reportId: 'gitlab-blocked',
      imgSrc: './assets/icons8-gitlab-480.png',
      imgAlt: 'Reporte GitLab Bloqueados',
      description: 'Listado de usuarios bloqueados en GitLab.'
    },
    {
      type: 'report',
      title: 'Incidencias de Software',
      reportId: 'incidencias',
      imgSrc: './assets/icons8-gitlab-480.png',
      imgAlt: 'Reporte GitLab Bloqueados',
      description: 'Listado de usuarios bloqueados en GitLab.'
    },
    {
      type: 'report',
      title: 'Publicaciones de Codigo',
      reportId: 'publicaciones',
      imgSrc: './assets/icons8-gitlab-480.png',
      imgAlt: 'Reporte GitLab Bloqueados',
      description: 'Listado de usuarios bloqueados en GitLab.'
    },
    {
      type: 'route',
      title: 'Reporte de Usuarios Gitlab',
      routerLink: ['/home/pantalla-usuario'],
      imgSrc: './assets/icons8-developer-100.png',
      imgAlt: 'Arqsw',
      description: 'Gestión de usuarios (vista interna).'
    },
    {
      type: 'route',
      title: 'Base de Datos',
      routerLink: ['/home/pantalla-roles'],
      imgSrc: './assets/icons8-database-100.png',
      imgAlt: 'bdd',
      description: 'Pantalla de roles/base de datos.'
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
      case 'gitlab':
        return this.reportesService.apiReportesGetReportGitlabGet('body');
      case 'gitlab-blocked':
        return this.reportesService.apiReportesGetReportGitlabGet('body'); 
      case 'gitlab-all':
        return this.reportesService.apiReportesGetReportGitlabGet('body'); 
      case 'software':
        return this.reportesService.apiReportesGetReportGitlabGet('body'); 
      case 'incidencias':
        return this.reportesService.apiReportesGetReportGitlabGet('body');
      case 'publicaciones':
        return this.reportesService.apiReportesGetReportGitlabGet('body'); 
      default:
        return null;
    }
  }
}