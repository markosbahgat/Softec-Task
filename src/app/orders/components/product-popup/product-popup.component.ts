import { IProduct } from 'app/core';
import { Component } from '@angular/core';
import { CartService } from 'app/cart/services/cart.service';
import { OrdersService } from 'app/orders/services/orders.service';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.scss'],
})
export class ProductPopupComponent {
  public product: IProduct | null = null;
  constructor(
    private ordersService: OrdersService,
    private cartService: CartService
  ) {}
  hideProduct() {
    this.ordersService.toggleProductPopUp();
  }
  addToCart() {
    this.cartService.addToCart(this.product as IProduct);
    this.hideProduct();
  }
  ngOnInit(): void {
    this.product = this.ordersService.getSelectedProduct();
  }
}
