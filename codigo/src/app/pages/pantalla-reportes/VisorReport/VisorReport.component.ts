import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gitlab-report',
  templateUrl: './VisorReport.component.html',
  styleUrl: './VisorReport.component.css'
})
export class VisorReportComponent implements OnInit {
  pdfSrc: SafeResourceUrl;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { base64: string },
    private sanitizer: DomSanitizer
  ) {
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${data.base64}`);
  }

    descargarPDF(): void {
    const byteCharacters = atob(this.data.base64);
    const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'ReporteGitlab.pdf';
    a.click();

    window.URL.revokeObjectURL(url);
  }
  
  ngOnInit(): void {
  }

}