import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router'; 
import { EmployeesListComponent } from './employees-list/employees-list.component'; 
import { EmployeeDetailsComponent } from './employee-details/employee-details.component'; 
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
   { path: '', component: EmployeesListComponent }, 
   { path: ':id', component: EmployeeDetailsComponent }, 
   { path: ':id/edit', component: EmployeeEditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
