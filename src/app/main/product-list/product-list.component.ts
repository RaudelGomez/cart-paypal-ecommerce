import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products = [1,2,3,4];
}
