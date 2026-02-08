import { Component } from '@angular/core';

import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-dashboard';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.loadMe().subscribe();
  }
}
