import { Component, Input } from '@angular/core';
import { IUser } from 'app/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user: IUser | null = null;
}
