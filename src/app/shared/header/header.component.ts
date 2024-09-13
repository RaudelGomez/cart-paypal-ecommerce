import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  totalItems: number = 0;
  subscription: Subscription = new Subscription();

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.getCartDataBase();
    this.calcTotalItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  calcTotalItems(){
    const sub = this.cartService.getProductsCart()
    .pipe(map(items =>{
      return items.reduce((acc, curr)=> acc +  curr.productQuantity, 0)
    }))
    .subscribe(val =>{
      this.totalItems = val;
    });
    this.subscription.add(sub);
  }
}
