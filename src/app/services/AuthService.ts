import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5173/api/TelegramAuth';

  private isAuthorizedSubject = new BehaviorSubject<boolean>(
    this.getAuthorizationStatus()
  );
  isAuthorized$ = this.isAuthorizedSubject.asObservable();

  constructor(private http: HttpClient) {}

  sendUserDataToServer(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/telegram-login`, user);
  }

  setAuthorizationStatus(status: boolean): void {
    localStorage.setItem('isAuthorized', status ? 'true' : 'false');
    this.isAuthorizedSubject.next(status);
  }

  getAuthorizationStatus(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthorized') === 'true';
    }
    return false;
  }
}
