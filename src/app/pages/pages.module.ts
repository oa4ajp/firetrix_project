import { NgModule } from '@angular/core';

import { p404Component } from './404.component';
import { p500Component } from './500.component';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    p404Component,
    p500Component
  ]
})
export class PagesModule { }
