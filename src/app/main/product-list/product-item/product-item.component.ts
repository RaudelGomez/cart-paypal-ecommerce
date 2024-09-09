import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProductClass } from '../../../models/product.class';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

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

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.getDescription(); 
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

}
