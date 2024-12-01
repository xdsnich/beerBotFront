import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5173/api/TelegramAuth';

  constructor(private http: HttpClient) {}

  sendUserDataToServer(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/telegram-login`, user);
  }

  setAuthorizationStatus(status: boolean): void {
    localStorage.setItem('isAuthorized', status ? 'true' : 'false');
  }

  getAuthorizationStatus(): boolean {
    return localStorage.getItem('isAuthorized') === 'true';
  }
}
