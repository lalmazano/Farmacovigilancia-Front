import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html'
})
export class QrDialogComponent {
  irAUrl() {
    window.open('https://forms.gle/wrp5VctTNpghbEBJ8', '_blank');
  }
}