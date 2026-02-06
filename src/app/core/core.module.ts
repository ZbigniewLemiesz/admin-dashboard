import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingComponent } from './loading/loading.component';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { AuthErrorInterceptor } from './interceptors/auth-error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule, 
    MaterialModule
  ],
  exports: [LoadingComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule should only be imported in AppModule!');
    }
  }
}
