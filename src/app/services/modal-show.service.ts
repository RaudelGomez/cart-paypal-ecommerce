import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  
  private modalShow: boolean = true;
  private modalShowSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.modalShow);

  constructor() { }

  changeModalStatus(){
    this.modalShow = !this.modalShow;
    this.modalShowSubject.next(this.modalShow);
    console.log(this.modalShow);
  }

  getChangeModalStatus(){
    return this.modalShowSubject.asObservable();
  }
}
