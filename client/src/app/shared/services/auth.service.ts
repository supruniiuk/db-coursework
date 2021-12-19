import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserRegistration } from '../interfaces';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Token {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    const expires = new Date(localStorage.getItem('expires'));
    if (new Date() > expires) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(user: User) {
    this.http.post(`${environment.apiAddress}/users/login`, user).subscribe(
      (response: Token) => {
        this.setToken(response.token);
      },
      (error: Error) => {
        console.log('Login Error', error);
      }
    );
  }

  registration(user: UserRegistration) {
    console.log(user);
    this.http.post(`${environment.apiAddress}/users`, user).subscribe(
      (response: Token) => {
        this.setToken(response.token);
      },
      (error: Error) => {
        console.log('Registration Error', error);
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
      const expiresIn = new Date(tokenInfo.exp * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expires', expiresIn.toString());
      this.router.navigate(['/']);
    } else {
      localStorage.clear();
    }
  }

  getDecodedAccessToken(token: string = localStorage.getItem('token')): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getUserRole(): string {
    let token = localStorage.getItem('token');
    let info = this.getDecodedAccessToken(token);
    return info.role;
  }
}
