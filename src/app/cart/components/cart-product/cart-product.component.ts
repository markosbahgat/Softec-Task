import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'app/cart/services/cart.service';
import { IProduct } from 'app/core';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent {
  @Input() products: IProduct[] = [];
  public options: number[] = [...Array(10).keys()].slice(1, 10);
  public selectedOption: number = this.options[0];
  constructor(private cartService: CartService) {}
  removeProductFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  onSelectChange(event: Event, id: number): void {
    const selectedValue = Number((event.target as HTMLSelectElement).value);
    this.cartService.changeQuantity(id, selectedValue);
  }
  ngOnInit() {}
}
