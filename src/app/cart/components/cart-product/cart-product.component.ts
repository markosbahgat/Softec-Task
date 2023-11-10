import { Component, Input, OnInit } from '@angular/core';
import { CartService, IProduct } from 'app/core';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit {
  @Input() products: IProduct[] = [];
  public options: number[] = [...Array(10).keys()].slice(1, 10);
  public selectedOption: number = this.options[0];
  constructor(private cartService: CartService) {}
  removeProductFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  onSelectChange(event: Event, id: number) {
    const selectedValue = Number((event.target as HTMLSelectElement).value);
    this.cartService.changeQuantity(id, selectedValue);
  }
  ngOnInit() {}
}
