import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { AuthMe } from './auth-me.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080';

  private meSubject = new BehaviorSubject<AuthMe | null>(null);
  me$ = this.meSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadMe(force = false): Observable<AuthMe | null> {
    const cached = this.meSubject.value;
    if (!force && cached) return of(cached);

    return this.http
      .get<AuthMe>(`${this.api}/auth/me`, { withCredentials: true })
      .pipe(
        tap((me) => this.meSubject.next(me)),
        catchError(() => {
          this.meSubject.next(null);
          return of(null);
        }),
      );
  }

  login(email: string, password: string): Observable<HttpResponse<void>> {
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http
      .post<void>(`${this.api}/login`, body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(switchMap((resp) => this.loadMe(true).pipe(mapTo(resp))));
  }

  logout() {
    return this.http
      .post<void>(`${this.api}/logout`, null, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(tap(() => this.meSubject.next(null)));
  }

  isLoggedIn(): boolean {
    return !!this.meSubject.value;
  }

  hasRole(role: string): boolean {
    const r = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
    return this.meSubject.value?.roles?.includes(r) ?? false;
  }
}
