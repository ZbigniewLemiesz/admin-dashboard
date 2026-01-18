import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private api = 'http://localhost:8080/auth/me';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.http.get(this.api).pipe(
      map(() => true),
      catchError(() => {
        this.router.navigateByUrl('/auth/login');
        return of(false);
      }),
    );
  }
}
