import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: IProduct[] = [];
  total: number = 0;
  constructor(private cartService: CartService) {}
  removeProductFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((state) => {
      this.products = state;
    });
    this.cartService.getTotalPrice().subscribe((state) => {
      this.total = state;
    });
  }
}
