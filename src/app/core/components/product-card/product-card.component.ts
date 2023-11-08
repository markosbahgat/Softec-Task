import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() item: IProduct | null = null;
  constructor(private cartService: CartService) {}
  addProductToCart() {
    this.cartService.addToCart(this.item as IProduct);
  }
}
