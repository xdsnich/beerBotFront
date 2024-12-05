import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://webappbeer.onrender.com/api/TelegramAuth/telegram-login';
  constructor(private http: HttpClient) {}

  useTelegram() {
    const tg = (window as any).Telegram.WebApp;
    return {
      tg,
      user: tg.initDataUnsafe?.user,
    };
  }

  initTelegram() {
    const { tg, user } = this.useTelegram();

    if (tg) {
      tg.init(); 

      if (user) {
        const userData = {
          telegramId: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          photoUrl: user.photo_url,
        };

        console.log('User Data:', userData);

        // Отправляем данные пользователя на сервер
        this.saveUserData(userData);
      }

      tg.expand(); // Расширяем WebApp на весь экран
    }
  }

  saveUserData(userData: any) {
    this.http.post(this.apiUrl, userData).subscribe({
      next: (response) => {
        console.log('User data saved:', response);
      },
      error: (error) => {
        console.error('Error saving user data:', error);
        alert('Failed to save user data. Please try again.');
      },
    });
  }
  
}
