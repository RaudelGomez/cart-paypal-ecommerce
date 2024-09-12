import { Component } from '@angular/core';
import { ModalShowService } from '../../services/modal-show.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductClass } from '../../models/product.class';

@Component({
  selector: 'app-modal-info-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-info-product.component.html',
  styleUrl: './modal-info-product.component.scss'
})
export class ModalInfoProductComponent {
  $modalData!: ProductClass[];
  subscription: Subscription = new Subscription();

  constructor(private modalShowService: ModalShowService){}

  ngOnInit(): void {
    this.getDataModal(); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  getDataModal(){
    const sub = this.modalShowService.getModalInfo().subscribe(
      val => this.$modalData = val
    )
    this.subscription.add(sub);
  }

}
