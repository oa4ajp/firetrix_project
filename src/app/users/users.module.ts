import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: 
  [
    UsersRoutingModule, 
    SharedModule,
    FormsModule
  ],
  declarations: [routedComponents]
})
export class UsersModule { }