import { IProduct } from './product.model';

export interface IOrder {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: IProduct[];

  PaymentType: string;
}
