import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
