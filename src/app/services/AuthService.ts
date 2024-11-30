// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorized = false;

  constructor(private http: HttpClient) {}

  setAuthorizationStatus(status: boolean) {
    this.authorized = status;
  }

  getAuthorizationStatus() {
    return this.authorized;
  }

  sendUserDataToServer(user: any): Observable<any> {
    const url = 'http://localhost:5173/api/TelegramLogin';
    return this.http.post(url, user);
  }
}

