import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private apiUrl = 'https://yourbackend.com/api/beer/';

  constructor(private http: HttpClient) {}

  getBeerData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getData`);
  }

  setBeerData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}setData`, data);
  }
}
