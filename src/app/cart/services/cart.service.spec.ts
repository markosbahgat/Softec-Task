import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../core/models/product.model';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let products$: BehaviorSubject<IProduct[]>;
  let totalPrice$: BehaviorSubject<number>;

  beforeEach(() => {
    products$ = new BehaviorSubject<IProduct[]>([]);
    totalPrice$ = new BehaviorSubject<number>(0);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            products$: products$.asObservable(),
            totalPrice$: totalPrice$.asObservable(),
            setState: (newState: any) => {
              products$.next(newState);
              newState.forEach((item: IProduct) => {
                totalPrice$.next(
                  totalPrice$.value + item.ProductPrice * item.Quantity
                );
              });
            },
            addToCart: (item: IProduct) => {
              let products: IProduct[] = products$.value;
              products.push(item);
              products$.next(products);
            },
            changeQuantity: (id: number, quantity: number) => {
              let products: IProduct[] = products$.value;
              const newProducts = products.map((item: IProduct) => {
                if (item.ProductId === id) {
                  return { ...item, Quantity: quantity };
                }
                return item;
              });
              products$.next(newProducts);
            },
            removeFromCart: (id: number) => {
              const targetProduct = products$.value.find(
                (item: IProduct) => item.ProductId === id
              ) as IProduct;
              products$.next(
                products$.value.filter(
                  (item: IProduct) => item.ProductId !== id
                )
              );
              totalPrice$.next(
                totalPrice$.value -
                  targetProduct.ProductPrice * targetProduct.Quantity
              );
            },
          },
        },
      ],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart products', (done) => {
    const products: IProduct[] = [
      {
        ProductId: 1,
        ProductName: 'Product 1',
        ProductPrice: 10,
        ProductImg: '',
        AvailablePieces: 0,
        Quantity: 1,
      },
      {
        ProductId: 2,
        ProductName: 'Product 2',
        ProductPrice: 20,
        ProductImg: '',
        AvailablePieces: 0,
        Quantity: 2,
      },
    ];
    products$.next(products);

    service.getCartProducts().subscribe((result) => {
      expect(result).toEqual(products);
      done();
    });
  });

  it('should get total price', (done) => {
    const totalPrice = 50;
    totalPrice$.next(totalPrice);

    service.getTotalPrice().subscribe((result) => {
      expect(result).toEqual(totalPrice);
      done();
    });
  });

  it('should add to cart', () => {
    const item: IProduct = {
      ProductId: 3,
      ProductName: 'Product 3',
      ProductPrice: 30,
      ProductImg: '',
      AvailablePieces: 0,
      Quantity: 3,
    };
    service.addToCart(item);
    expect(products$.value).toContain(item);
  });

  it('should change quantity', () => {
    const products: IProduct[] = [
      {
        ProductId: 1,
        ProductName: 'Product 1',
        ProductPrice: 10,
        ProductImg: '',
        AvailablePieces: 0,
        Quantity: 1,
      },
      {
        ProductId: 2,
        ProductName: 'Product 2',
        ProductPrice: 20,
        ProductImg: '',
        AvailablePieces: 0,
        Quantity: 2,
      },
    ];
    products$.next(products);

    const id = 2;
    const quantity = 3;
    service.changeQuantity(id, quantity);

    const expectedProducts: IProduct[] = [
      {
        ProductId: 1,
        ProductName: 'Product 1',
        ProductPrice: 10,
        Quantity: 1,
        ProductImg: '',
        AvailablePieces: 0,
      },
      {
        ProductId: 2,
        ProductName: 'Product 2',
        ProductPrice: 20,
        Quantity: 3,
        ProductImg: '',
        AvailablePieces: 0,
      },
    ];
    expect(products$.value).toEqual(expectedProducts);
  });

  it('should remove from cart', () => {
    const products: IProduct[] = [
      {
        ProductId: 1,
        ProductName: 'Product 1',
        ProductImg: '',
        AvailablePieces: 0,
        ProductPrice: 10,
        Quantity: 1,
      },
      {
        ProductId: 2,
        ProductName: 'Product 2',
        ProductPrice: 20,
        ProductImg: '',
        AvailablePieces: 0,
        Quantity: 2,
      },
    ];
    products$.next(products);

    const id = 2;
    service.removeFromCart(id);

    const expectedProducts: IProduct[] = [
      {
        ProductId: 1,
        ProductName: 'Product 1',
        ProductPrice: 10,
        ProductImg: '',
        AvailablePieces: 0,
        Quantity: 1,
      },
    ];
    expect(products$.value).toEqual(expectedProducts);
  });
});
