import { Validators } from '@angular/forms';

export interface EmployeeCreateDto { 
    firstName: string; 
    lastName: string; 
    email: string; 
}

export const employeeCreateFormConfig = { 
    firstName: ['', { nonNullable: true }], 
    lastName: ['', { nonNullable: true }], 
    email: ['', { nonNullable: true }]
 };

 export const employeeCreateValidators = { 
    firstName: ['', [Validators.required, Validators.minLength(2)]], 
    lastName: ['', [Validators.required, Validators.minLength(2)]], 
    email: ['', [Validators.required, 
    Validators.email]] 
};