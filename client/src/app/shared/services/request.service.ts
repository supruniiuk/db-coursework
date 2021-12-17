import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class RequestService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  public get<T>(route: string): Observable<T> {
    return this.http.get<T>(`${environment.apiAddress}/` + route, {
      headers: this.generateHeaders(),
    });
  }

  public create<T>(route: string, body): Observable<T> {
    return this.http.post<T>(`${environment.apiAddress}/` + route, body, {
      headers: this.generateHeaders(),
    });
  }

  public update<T>(route: string, body): Observable<T> {
    return this.http.put<T>(`${environment.apiAddress}/` + route, body, {
      headers: this.generateHeaders(),
    });
  }

  public delete<T>(route: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiAddress}/` + route, {
      headers: this.generateHeaders(),
    });
  }

  private generateHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.token,
    });
  }
}
