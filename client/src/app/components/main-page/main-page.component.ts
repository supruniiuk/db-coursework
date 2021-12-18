import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  role: string = '';
  isLogin: boolean = false;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.isLogin = this.isAuthenticated();
    if (this.isLogin) {
      this.role = this.auth.getUserRole();
    }
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
  }
}
