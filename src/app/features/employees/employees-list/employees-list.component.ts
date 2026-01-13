import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, merge, of } from 'rxjs';
import { startWith, switchMap, catchError, debounceTime } from 'rxjs/operators';

import { Employee } from '../../../shared/models/employee/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements AfterViewInit {
  columns = ['id', 'firstName', 'lastName', 'email', 'actions'];
  data: Employee[] = [];
  resultsLength = 0;

  filters: any = { firstName: '', lastName: '', email: '' };
  isLoading = true;
  filterChanged$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService) {}

  ngAfterViewInit(): void {
    const debouncedFilters$ = this.filterChanged$.pipe(debounceTime(1000));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      debouncedFilters$
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.employeeService
            .getPage(
              this.paginator.pageIndex,
              this.paginator.pageSize || 10,
              this.sort.active || 'lastName',
              this.sort.direction || 'asc',
              this.filters
            )
            .pipe(
              catchError((err) => {
                console.error('Błąd pobierania danych', err);
                this.isLoading = false;
                return of({
                  content: [],
                  totalElements: 0,
                });
              })
            );
        })
      )
      .subscribe((page) => {
        this.data = page.content;
        this.resultsLength = page.totalElements;
        this.isLoading = false;
      });
  }

  applyFilter(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filters[field] = value;
    this.paginator.pageIndex = 0; // reset strony
    this.filterChanged$.next({ ...this.filters });
  }
}
