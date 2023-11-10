import { Component, OnInit } from '@angular/core';
import { IProduct } from 'app/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public products: IProduct[] = [];
  public total: number = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((state) => {
      this.products = state;
    });
    this.cartService.getTotalPrice().subscribe((state) => {
      this.total = Math.round(state);
    });
  }
}
