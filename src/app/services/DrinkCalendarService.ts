import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrinkCalendarService {
  private baseUrl = 'http://localhost:5173/api/DrinkEntries';

  constructor(private http: HttpClient) {}

  getEntries(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addEntry(entry: { userId: number; date: string; liters: number }) {
    return this.http.post(this.baseUrl, entry);
  }
}
