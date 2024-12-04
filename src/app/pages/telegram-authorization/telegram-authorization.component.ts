import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-telegram-authorization',
  standalone: true,
  templateUrl: './telegram-authorization.component.html',
  styleUrls: ['./telegram-authorization.component.scss'],
})
export class TelegramAuthorizationComponent implements AfterViewInit {
  constructor(
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  // Метод, вызываемый после инициализации представления
  ngAfterViewInit(): void {
    this.authService.checkAuthFromURL();
    // Создаем скрипт
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'beerUAbot'); // Замените 'beerUAbot' на ваше имя бота
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');

    // Добавляем скрипт в контейнер
    const container = this.elementRef.nativeElement.querySelector(
      '#telegram-widget-container'
    );
    container.appendChild(script);
    (window as any).onTelegramAuth = (user: any) => this.onTelegramAuth(user);
    
  }

  onTelegramAuth(user: any) {
    const telegramData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      auth_date: user.auth_date,
      hash: user.hash,
      photo_url: user.photo_url,
    };
    console.log('Данные для отправки на сервер:', telegramData)
    this.authService.sendUserDataToServer(telegramData).subscribe(
      (response) => {
        const token = response.token;
        this.storeToken(token);
        console.log('Данные успешно отправлены на сервер:', response);
        this.authService.setAuthorizationStatus(true);
      },
      (error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
        alert('Ошибка авторизации');
      }
    );
  }
  storeToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }
}
