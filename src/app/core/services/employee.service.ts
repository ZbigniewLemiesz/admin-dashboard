import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from 'src/app/shared/models/employee/employee.model';
import { EmployeeCreateDto } from 'src/app/shared/models/employee/employee-create.dto';
import { EmployeePatchDto } from 'src/app/shared/models/employee/employee-patch.dto';
import { EmployeePutDto } from 'src/app/shared/models/employee/employee-put.dto';
import { Page } from '../../shared/models/page.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private api = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {}

  getPage(
    page: number,
    size: number,
    sort: string,
    direction: string,
    filters: any
  ) {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', `${sort},${direction}`);

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<Page<Employee>>(this.api, { params });
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.api}/${id}`);
  }

  create(dto: EmployeeCreateDto): Observable<Employee> {
    return this.http.post<Employee>(this.api, dto);
  }

  update(id: number, dto: EmployeePutDto): Observable<Employee> {
    return this.http.put<Employee>(`${this.api}/${id}`, dto);
  }

  patch(id: number, dto: EmployeePatchDto): Observable<Employee> {
    return this.http.patch<Employee>(`${this.api}/${id}`, dto);
  }

  delete(id: number, version: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}?version=${version}`);
  }
}
