import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/cart/services/cart.service';
import { IProduct } from 'app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public isUserAuthenticated: boolean = false;
  public isSidebarOpened: boolean = false;
  public products: IProduct[] = [];
  constructor(private cartService: CartService) {}
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((state) => {
      this.products = state;
    });
    this.isUserAuthenticated = localStorage.getItem('userId') ? true : false;
  }
}
