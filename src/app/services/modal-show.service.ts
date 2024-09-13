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
  private showCartModal: boolean = true;
  private showCartModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showCartModal);

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

  changeShowModalCart(){
    this.showCartModal = !this.showCartModal;
    this.showCartModalSubject.next(this.showCartModal);
  }

  getShowCartModalvalue(){
    return this.showCartModalSubject.asObservable();
  }

}
