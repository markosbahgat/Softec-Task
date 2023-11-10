import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder, OrdersService } from 'app/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  private id: number = 0;
  public orderDetail: IOrder | undefined;
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
