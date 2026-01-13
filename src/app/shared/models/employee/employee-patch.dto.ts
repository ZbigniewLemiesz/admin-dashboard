import { Validators } from '@angular/forms';

export interface EmployeePatchDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  version: number;
}


export const employeePatchValidators = {
  firstName: [''],
  lastName: [''],
  email: ['', Validators.email],
  version: [0, Validators.required]
};
