import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private countLoading:number;
  private isLoading:BehaviorSubject<boolean> | undefined;
  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
    this.countLoading = 0;
   }

   public addLoading(){
      this.countLoading +=1;
      this.isLoading?.next(true);
   }

   public removeLoading(){
      if(this.countLoading > 0){
        this.countLoading -=1;
        if(this.countLoading == 0){
          this.isLoading?.next(false);
        }else{
          this.isLoading?.next(true);
        }
      }
      else{
        this.isLoading?.next(false);
      }
   }

   public getLoading(){
      return this.isLoading;
   }

}
