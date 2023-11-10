import { Component } from '@angular/core';
import { IUser } from 'app/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  providers: [UsersService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: IUser[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
