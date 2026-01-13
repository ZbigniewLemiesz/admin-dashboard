import { Validators } from '@angular/forms'; 

export interface EmployeePutDto { 
    firstName: string; 
    lastName: string; 
    email: string; 
    version: number; 
} 

export const employeePutValidators = { 
    firstName: ['', [Validators.required, Validators.minLength(2)]], 
    lastName: ['', [Validators.required, Validators.minLength(2)]], 
    email: ['', [Validators.required, Validators.email]], 
    version: [0, [Validators.required]] 
};