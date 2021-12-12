import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import jwt_decode from 'jwt-decode';
interface Token {
  token: string;
}


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return '';
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

  logout() {}

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(token: string) {
    const tokenInfo = this.getDecodedAccessToken(token);
    console.log(tokenInfo);
    localStorage.setItem('currentUser', token);
  }

  private getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
