import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isAuthenticated() {
    const userId = localStorage.getItem('userId') as string;
    return userId ? true : false;
  }
}
