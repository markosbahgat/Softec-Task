import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder, OrdersService } from 'app/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  id: number = 0;
  orderDetail: IOrder | undefined;
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.ordersService.getOrder(this.id).subscribe((order) => {});
  }
}
