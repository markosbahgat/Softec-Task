import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/cart/services/cart.service';
import { IProduct } from 'app/core';
import { AuthService } from 'app/login/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public isUserAuthenticated: boolean = false;
  public isSidebarOpened: boolean = false;
  public products: IProduct[] = [];
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((state) => {
      this.products = state;
    });
    this.authService.getAuthenticationStatus().subscribe((status) => {
      this.isUserAuthenticated = status;
    });
    this.isUserAuthenticated = localStorage.getItem('userId') ? true : false;
  }
}
