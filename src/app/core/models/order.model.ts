export interface IOrder {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: IProduct[];
  PaymentType: string;
}

interface IProduct {
  ProductId: number;
  Quantity: number;
}
