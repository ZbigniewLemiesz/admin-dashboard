import { HttpClient, HttpParams, HttpResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<HttpResponse<void>> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<void>(
      `${this.api}/login`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,  
        observe: 'response'
      }
    );
  }

  logout(): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${this.api}/logout`, null,{
      withCredentials: true,
      observe: 'response'
    });
  }
}
