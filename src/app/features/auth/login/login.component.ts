import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    this.error = '';

    const email = this.form.get('email')!.value;
    const password = this.form.get('password')!.value;

    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.status === 204 || res.status === 200) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.error = 'Nieoczekiwana odpowiedź serwera';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error =
          err.status === 401 ? 'Błędny email lub hasło' : 'Błąd serwera';
      },
    });
  }
}
