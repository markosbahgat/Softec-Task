import { Component, Input } from '@angular/core';
import { IOrder, IProduct } from 'app/core';
import { Router } from '@angular/router';
import { OrdersService } from 'app/orders/services/orders.service';

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
  protected viewProduct(product: IProduct): void {
    this.ordersService.selectProduct(product);
  }
  protected toOrderPage(id: number): void {
    this.router.navigate(['/order/' + id]);
  }
}
