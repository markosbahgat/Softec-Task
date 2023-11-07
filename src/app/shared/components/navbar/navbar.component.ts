import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isUserAuthenticated: boolean = false;
  isSidebarOpened: boolean = false;
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  ngOnInit(): void {
    this.isUserAuthenticated = localStorage.getItem('userId') ? true : false;
  }
}
