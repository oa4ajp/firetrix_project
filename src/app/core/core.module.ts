/* 3rd party libraries */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


/* our own custom services  */
import { AuthorizationService } from './service/authorization.service';

@NgModule({
  imports: [
    /* 3rd party libraries */
    CommonModule,
    HttpModule 
  ],
  declarations: [],
  providers: [
    /* our own custom services  */
    AuthorizationService
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}