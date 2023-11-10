import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OrdersService } from './orders.service';
import { ProductsService } from '../../products/services/products.service';
import { IOrder } from '../../core/models/order.model';
import { IProduct } from '../../core/models/product.model';
import { Operator, Observable } from 'rxjs';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
    productsService = TestBed.inject(ProductsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrders', () => {
    it('should return an Observable<IOrder[]>', () => {
      const dummyOrders: IOrder[] = [
        {
          OrderId: 1,
          PaymentType: 'Credit Card',
          Products: [
            {
              ProductId: 1,
              Quantity: 2,
              ProductName: 'Product 1',
              ProductPrice: 20,
              AvailablePieces: 2,
              ProductImg: 'Description 1',
            },
            {
              ProductId: 2,
              Quantity: 1,
              ProductName: 'Product 2',
              ProductPrice: 20,
              AvailablePieces: 2,
              ProductImg: 'Description 2',
            },
          ],
          OrderDate: new Date('2021-10-01T00:00:00.000Z').toISOString(),
          UserId: '1',
        },
        {
          OrderId: 2,
          PaymentType: 'PayPal',
          Products: [
            {
              ProductId: 3,
              Quantity: 3,
              ProductName: 'Product 3',
              ProductPrice: 30,
              AvailablePieces: 3,
              ProductImg: 'Description 3',
            },
          ],
          OrderDate: new Date('2021-10-01T00:00:00.000Z').toISOString(),
          UserId: '2',
        },
      ];

      service.getOrders().subscribe((orders) => {
        expect(orders.length).toBe(2);
        expect(orders).toEqual(dummyOrders);
      });

      const req = httpMock.expectOne(service['jsonUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(dummyOrders);
    });
  });

  describe('addOrder', () => {
    it('should add a new order', () => {
      const order: IOrder = {
        OrderId: 3,
        PaymentType: 'Credit Card',
        Products: [
          {
            ProductId: 1,
            Quantity: 2,
            ProductName: 'Product 1',
            ProductPrice: 20,
            AvailablePieces: 2,
            ProductImg: 'Description 1',
          },
          {
            ProductId: 2,
            Quantity: 1,
            ProductName: 'Product 2',
            ProductPrice: 20,
            AvailablePieces: 2,
            ProductImg: 'Description 2',
          },
        ],
        OrderDate: new Date('2021-10-03T00:00:00.000Z').toISOString(),
        UserId: '3',
      };

      spyOn(localStorage, 'getItem').and.returnValue('3');

      service.addOrder(order);

      const req = httpMock.expectOne(service['jsonUrl']);
      expect(req.request.method).toBe('GET');
      req.flush([]);

      const req2 = httpMock.expectOne(service['jsonUrl']);
      expect(req2.request.method).toBe('PUT');
      expect(req2.request.body).toEqual([order]);
      req2.flush([]);
    });
  });

  describe('getOrderProducts', () => {
    it('should return an array of IProduct with quantities', () => {
      const products: { ProductId: number; Quantity: number }[] = [
        { ProductId: 1, Quantity: 2 },
        { ProductId: 2, Quantity: 1 },
      ];

      const dummyProducts: IProduct[] = [
        {
          ProductId: 1,
          ProductName: 'Product 1',
          ProductImg: 'Description 1',
          ProductPrice: 20,
          AvailablePieces: 2,
          Quantity: 1,
        },
        {
          ProductId: 2,
          ProductName: 'Product 2',
          ProductImg: 'Description 2',
          ProductPrice: 20,
          AvailablePieces: 2,
          Quantity: 1,
        },
      ];

      spyOn(productsService, 'getProducts').and.returnValue({
        subscribe: (callback: any) => callback(dummyProducts),
        source: undefined,
        operator: undefined,
        lift: function <R>(
          operator?: Operator<IProduct[], R> | undefined
        ): Observable<R> {
          throw new Error('Function not implemented.');
        },
        forEach: function (next: (value: IProduct[]) => void): Promise<void> {
          throw new Error('Function not implemented.');
        },
        pipe: function (): Observable<IProduct[]> {
          throw new Error('Function not implemented.');
        },
        toPromise: function (): Promise<IProduct[] | undefined> {
          throw new Error('Function not implemented.');
        },
      });

      const result = service.getOrderProducts(products);

      expect(result).toEqual(
        jasmine.arrayWithExactContents(dummyProducts) as any
      );
    });
  });
});

describe('getOrder', () => {
  it('should return an Observable<IOrder>', () => {
    const dummyOrders: IOrder[] = [
      {
        OrderId: 1,
        PaymentType: 'Credit Card',
        Products: [
          {
            ProductId: 1,
            Quantity: 2,
            ProductName: 'Product 1',
            ProductPrice: 20,
            AvailablePieces: 2,
            ProductImg: 'Description 1',
          },
          {
            ProductId: 2,
            Quantity: 1,
            ProductName: 'Product 2',
            ProductPrice: 20,
            AvailablePieces: 2,
            ProductImg: 'Description 2',
          },
        ],
        OrderDate: new Date('2021-10-01T00:00:00.000Z').toISOString(),
        UserId: '1',
      },
      {
        OrderId: 2,
        PaymentType: 'PayPal',
        Products: [
          {
            ProductId: 3,
            Quantity: 3,
            ProductName: 'Product 3',
            ProductPrice: 30,
            AvailablePieces: 3,
            ProductImg: 'Description 3',
          },
        ],
        OrderDate: new Date('2021-10-02T00:00:00.000Z').toISOString(),

        UserId: '2',
      },
    ];

    //   service.getOrder(1).subscribe((order: IOrder) => {
    //     expect(order).toEqual(dummyOrders[0]);
    //   });

    //   const req = httpMock.expectOne(service['jsonUrl']);
    //   expect(req.request.method).toBe('GET');
    //   req.flush(dummyOrders);
  });
});
