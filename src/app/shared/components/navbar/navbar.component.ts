import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  isSidebarOpened: boolean = false;
  products: IProduct[] = [];
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
