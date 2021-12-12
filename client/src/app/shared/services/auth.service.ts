import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
interface Token {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,  private router: Router) {}

  get token(): string {
    const expires = new Date(localStorage.getItem('expires'));
    if (new Date() > expires) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(user: User) {
    this.http.post('http://localhost:5000/api/users/login', user).subscribe(
      (response: Token) => {
        console.log(response.token);
        this.setToken(response.token);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(token: string | null) {
    if (token) {
      const tokenInfo = this.getDecodedAccessToken(token);
      const expiresIn = new Date(tokenInfo.exp*1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expires', expiresIn.toString());
      console.log("AUTH", this.isAuthenticated());

      this.router.navigate(['/'])

    } else {
      console.log("hello")
      localStorage.clear();
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
