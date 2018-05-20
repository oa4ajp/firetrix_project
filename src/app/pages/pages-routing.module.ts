import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { p404Component } from './404.component';
import { p500Component } from './500.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [
      {
        path: '404',
        component: p404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: p500Component,
        data: {
          title: 'Page 500'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
