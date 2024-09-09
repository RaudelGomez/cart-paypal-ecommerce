import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductService } from '../../services/product.service';
import { ProductClass } from '../../models/product.class';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: ProductClass[] = [];

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.products = this.productService.getProducts;
  }
  
}
