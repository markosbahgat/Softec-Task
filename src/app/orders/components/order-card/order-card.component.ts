import { Component, Input } from '@angular/core';
import { IOrder, IProduct, OrdersService } from 'app/core';
import { Router } from '@angular/router';

interface IExtendedOrder extends IOrder {
  totalPrice: number;
}
@Component({
  selector: 'app-order-card',

  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent {
  @Input() order!: IExtendedOrder;

  constructor(private router: Router, private ordersService: OrdersService) {}
  viewProduct(product: IProduct) {
    this.ordersService.selectProduct(product);
  }
  toOrderPage(id: number) {
    this.router.navigate(['/order/' + id]);
  }
}
