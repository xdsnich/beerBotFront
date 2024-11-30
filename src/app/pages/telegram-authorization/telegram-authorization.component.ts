import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-telegram-authorization',
  standalone: true,
  imports: [],
  templateUrl: './telegram-authorization.component.html',
  styleUrls: ['./telegram-authorization.component.scss'],
})
export class TelegramAuthorizationComponent {
  constructor(private authService: AuthService) {}

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
