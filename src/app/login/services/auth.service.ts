import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isAuthenticated());
  constructor() {}
  isAuthenticated(): boolean {
    const userId = localStorage.getItem('userId') as string;
    return userId ? true : false;
  }
  authenticateUser(userId: string): void {
    localStorage.setItem('userId', userId);
    this.isUserAuthenticated.next(this.isAuthenticated());
  }
  ngOnInit(): void {
    this.isUserAuthenticated.next(this.isAuthenticated());
  }
  getAuthenticationStatus(): Observable<boolean> {
    return this.isUserAuthenticated.asObservable();
  }
}
