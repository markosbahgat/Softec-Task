import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

/**
 * Service for retrieving users data from a JSON file.
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private jsonUrl = '../../assets/static/users.json';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.jsonUrl);
  }
}
