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
  }

  onTelegramAuth(user: any) {
    console.log('Авторизован пользователь:', user);

    this.authService.sendUserDataToServer(user).subscribe(
      (response) => {
        console.log('Данные успешно отправлены на сервер:', response);
        this.authService.setAuthorizationStatus(true);
      },
      (error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
        alert('Ошибка авторизации');
      }
    );
  }
}
