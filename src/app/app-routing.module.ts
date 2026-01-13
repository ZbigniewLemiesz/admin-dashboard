import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employees/employees.module')
            .then(m => m.EmployeesModule)
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./features/roles/roles.module')
            .then(m => m.RolesModule)
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('./features/teams/teams.module')
            .then(m => m.TeamsModule)
      }
    ]
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
