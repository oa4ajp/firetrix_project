/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

/* our own custom components */
import { MessageBoxComponent } from '../core/components/message-box/message-box.component';
import { MessageBoxTypeDirective } from '../core/directives/message-box-type.directive';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule
  ],
  declarations: [
    MessageBoxComponent,
    MessageBoxTypeDirective
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    MessageBoxComponent,
    MessageBoxTypeDirective
    /* our own custom components */

  ]
})
export class SharedModule { }