import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // start request → pokaż spinner
    this.loading.show();

    return next.handle(req).pipe(
      // finalize wykona się zawsze (success albo error)
      finalize(() => {
        this.loading.hide();
      }),
    );
  }
}
