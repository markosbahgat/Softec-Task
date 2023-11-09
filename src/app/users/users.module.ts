import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserCardComponent } from 'app/core';

@NgModule({
  declarations: [UsersComponent, UserCardComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
