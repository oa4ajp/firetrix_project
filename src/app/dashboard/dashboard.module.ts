import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {CommonModule} from '@angular/common';
import { SalesService } from './services/sales.service';
import { SocialNetworkService } from './services/social-network.service';
import { TrafficService } from './services/traffic.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule
  ],
  declarations: [ DashboardComponent ],
  providers: [ SalesService, TrafficService, SocialNetworkService ]
})
export class DashboardModule { }
