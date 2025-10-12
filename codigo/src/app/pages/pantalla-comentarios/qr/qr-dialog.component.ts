import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html'
})
export class QrDialogComponent {
  irAUrl() {
    window.open('https://tu-link-de-qr.com', '_blank');
  }
}