import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder, IProduct, OrdersService, ProductsService } from 'app/core';
interface IExtendedOrder extends IOrder {
  totalPrice: number;
}

@Component({
  selector: 'app-orders',
  providers: [DatePipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders: IExtendedOrder[] = [];
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private router: Router
  ) {}
  toOrderPage(id: number) {
    this.router.navigate(['/order/' + id]);
  }
  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((ordersData: IOrder[]) => {
      this.productsService.getProducts().subscribe((products) => {
        this.orders = ordersData.map((item) => {
          return {
            ...item,
            totalPrice: item.Products.reduce((accumulator, item) => {
              return (
                accumulator +
                (
                  products.find(
                    (product) => product.ProductId === item.ProductId
                  ) as IProduct
                )?.ProductPrice *
                  item.Quantity
              );
            }, 0),
            Products: item.Products.map((item) => {
              return {
                ...(products.find(
                  (product) => product.ProductId === item.ProductId
                ) as IProduct),
                Quantity: item.Quantity,
              };
            }),
          };
        });
      });
    });
  }
}
