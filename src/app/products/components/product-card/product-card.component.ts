import { Component, Input } from '@angular/core';
import { CartService } from 'app/cart/services/cart.service';
import { IProduct } from 'app/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() item: IProduct | null = null;
  constructor(private cartService: CartService) {}
  addProductToCart(): void {
    this.cartService.addToCart(this.item as IProduct);
  }
}
