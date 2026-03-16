import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isSubmitting = false;
  error = '';
  success = '';

  form = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmNewPassword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting) return;

    const { currentPassword, newPassword, confirmNewPassword } = this.form.value;

    if (newPassword !== confirmNewPassword) {
      this.error = 'Hasła muszą być takie same';
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.success = '';

    this.auth.changePassword(currentPassword!, newPassword!).subscribe({
      next: () => {
        this.success = 'Hasło zostało zmienione';
        this.isSubmitting = false;
        this.form.reset();
      },
      error: (err) => {
        // jeśli backend zwróci ProblemDetail z code, możesz to mapować na komunikaty
        this.error = err?.error?.detail ?? 'Nie udało się zmienić hasła';
        this.isSubmitting = false;
      },
    });
  }

}
