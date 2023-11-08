import { Component, OnInit } from '@angular/core';
import { IProduct, CartService } from 'app/core';

@Component({
  selector: 'app-cart',
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: IProduct[] = [];
  total: number = 0;
  options: number[] = [...Array(10).keys()].slice(1, 10);
  selectedOption: number = this.options[0];
  constructor(private cartService: CartService) {}
  removeProductFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
  createNewOrder() {}
  onSelectChange(event: Event, id: number) {
    const selectedValue = Number((event.target as HTMLSelectElement).value);
    this.cartService.changeQuantity(id, selectedValue);
  }
  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((state) => {
      this.products = state;
    });
    this.cartService.getTotalPrice().subscribe((state) => {
      this.total = Math.round(state);
    });
  }
}
