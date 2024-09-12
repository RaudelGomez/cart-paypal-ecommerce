import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  
  private modalShow: boolean = true;
  private modalShowSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.modalShow);
  private modalData: any[] = [];
  private modalDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.modalData);

  constructor() { }

  changeModalStatus(){
    this.modalShow = !this.modalShow;
    this.modalShowSubject.next(this.modalShow);
  }

  getChangeModalStatus(){
    return this.modalShowSubject.asObservable();
  }

  sendDataModal(string:{}){
    this.modalData = [];
    this.modalData.push(string);
    this.modalDataSubject.next(this.modalData);
  }

  getModalInfo(){
    return this.modalDataSubject.asObservable();
  }
}
