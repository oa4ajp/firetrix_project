import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: 
  [
    UsersRoutingModule, 
    SharedModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [routedComponents, LoginComponent, RegisterComponent]
})
export class UsersModule { }