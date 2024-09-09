import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductService } from '../../services/product.service';
import { ProductClass } from '../../models/product.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: ProductClass[] = [];
  subscription: Subscription = new Subscription();

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getProductsDataBase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  loadProducts(){
    const sub = this.productService.getProducts().subscribe(
      item => {this.products = item}
    );
    this.subscription.add(sub);
  }
  
}
