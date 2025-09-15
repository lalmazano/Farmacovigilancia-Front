import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  private genSesionStorageName = 'filters'
  private textSesionStorageName = 'textFilter'
  private pageSesionStorageName = 'pageFilter'
  private filterSubject = new BehaviorSubject<string>('');
  private filterText = new BehaviorSubject<string>('');
  private pageFilter = new BehaviorSubject<string>('');
  filter$ = this.filterSubject.asObservable();
  filterText$ = this.filterText.asObservable();
  filterPage$ = this.pageFilter.asObservable();

  setFilter(filter: string) {
    sessionStorage.setItem(this.genSesionStorageName, filter)
    this.filterSubject.next(filter);
  }

  setTextFilter(filter: string) {
    sessionStorage.setItem(this.textSesionStorageName, filter)
    this.filterText.next(filter);
  }

  getFilter(): string {
    if(this.filterSubject.value == null 
    || this.filterSubject.value == undefined 
    || this.filterSubject.value == ''){
      if(sessionStorage.getItem(this.genSesionStorageName) != '' && sessionStorage.getItem(this.genSesionStorageName) != null){
        this.setFilter(sessionStorage.getItem(this.genSesionStorageName)!)
      }
    }
    return this.filterSubject.value;
  }

  getTextFilter(): string {
    if(this.filterText.value == null 
    || this.filterText.value == undefined 
    || this.filterText.value == ''){
      if(sessionStorage.getItem(this.textSesionStorageName) != '' && sessionStorage.getItem(this.textSesionStorageName) != null){
        this.setFilter(sessionStorage.getItem(this.textSesionStorageName)!)
      }
    }
    return this.filterText.value;
  }
}
