import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Employee } from '../../../shared/models/employee/employee.model';
import { EmployeeCreateDto } from '../../../shared/models/employee/employee-create.dto';
import { EmployeePutDto } from '../../../shared/models/employee/employee-put.dto';
import { EmployeeService } from '../../../core/services/employee.service';

import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {
  form!: FormGroup;
  employeeId: number | null = null;
  isEditMode = false;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.employeeId = idParam ? Number(idParam) : null;
    this.isEditMode = this.employeeId !== null;
    if (this.isEditMode) {
      this.loadEmployee();
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [{ value: null, disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      version: [0],
    });
  }

  private loadEmployee(): void {
    this.employeeService.getById(this.employeeId!).subscribe((emp) => {
      this.form.patchValue(emp);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValue = this.form.getRawValue();

    const request$ = this.isEditMode
      ? this.employeeService.update(
          this.employeeId!,
          this.mapToPutDto(formValue)
        )
      : this.employeeService.create(this.mapToCreateDto(formValue));

    request$
    .pipe(
      delay(5000)
    )
    .subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode
            ? 'Employee updated successfully'
            : 'Employee created successfully',
          'OK',
          { duration: 5000 }
        );
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.isSaving = false;
        this.snackBar.open(
          'An error occurred while saving the employee',
          'Close',
          { duration: 9000 }
        );
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  private mapToCreateDto(employee: Employee): EmployeeCreateDto {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    };
  }
  private mapToPutDto(employee: Employee): EmployeePutDto {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      version: employee.version,
    };
  }
}
