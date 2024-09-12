import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProductClass } from '../../../models/product.class';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { ModalShowService } from '../../../services/modal-show.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: ProductClass;

  description!: string;
  longDescription: boolean = false;
  $modalActivate!: boolean;
  subscription: Subscription = new Subscription();

  constructor(private cartService: CartService, public modalShowService: ModalShowService){}

  ngOnInit(): void {
    this.getDescription(); 
    this.getModalActivation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  getDescription(): void{
    let textLonger = 100;
    if(this.product.description.length > textLonger){
      this.longDescription = true;
      this.description = this.product.description.substring(0, textLonger);
    }else{
      this.longDescription = false;
      this.description = this.product.description
    }
  }

  addToCart(): void{
    this.cartService.addProductCart(this.product);
  }

  getModalActivation(){
    const sub = this.modalShowService.getChangeModalStatus().subscribe(
      val => this.$modalActivate = val
    )
    this.subscription.add(sub);
  }
}
