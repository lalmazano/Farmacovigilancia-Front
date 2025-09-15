import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private returnToMain = new Subject<void>();

  returnToMain$ = this.returnToMain.asObservable();

  navigateToMain() {
    this.returnToMain.next();
  }

}
