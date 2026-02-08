import { Component, OnInit } from '@angular/core';
import { AuthService } from '../features/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isMobile = false;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => (this.isMobile = mq.matches);

    update();
    mq.addEventListener('change', update);
  }

  closeOnMobile(drawer: any) {
    if (this.isMobile) {
      drawer.close();
    }
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigateByUrl('/auth/login'),
      error: () => this.router.navigateByUrl('/auth/login'),
    });
  }
}
