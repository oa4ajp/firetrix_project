import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { StudentRoutingModule, routedComponents} from './student-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: 
  [
    StudentRoutingModule, 
    SharedModule,
    FormsModule
  ],
  declarations: [ routedComponents ]
})
export class StudentModule { }

//Don’t import LazyModule (DashboardModule, StudentModule for any reason.
