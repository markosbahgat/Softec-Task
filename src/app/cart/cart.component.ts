import { Component, OnInit } from '@angular/core';
import { IProduct, CartService } from 'app/core';

@Component({
  selector: 'app-cart',
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
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
