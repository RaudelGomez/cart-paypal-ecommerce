import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProductClass } from '../../../models/product.class';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: ProductClass;

}
