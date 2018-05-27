import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { 
    path: '',
    data: {
      title: 'Student Profile'
    },
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Student Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }

export const routedComponents = [ProfileComponent];