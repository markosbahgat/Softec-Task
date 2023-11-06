import { Component } from '@angular/core';
import { IOrder } from 'src/app/core/models/order.model';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders: IOrder[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((data) => {
      console.log(data);
      this.orders = data;
    });
  }
}
