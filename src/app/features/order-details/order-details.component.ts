import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.ordersService.getOrder(this.id).subscribe((order) => {
      console.log(order);
    });
  }
}
