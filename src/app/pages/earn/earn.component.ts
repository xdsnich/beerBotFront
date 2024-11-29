import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HumanComponent } from '../../ThreD/human/human.component';

@Component({
  selector: 'app-earn',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, HumanComponent],
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.scss'],
})
export class EarnComponent implements OnInit {
  userData: any = {};
  progress: number = 80;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.init(); // Инициализация Telegram WebApp

      // Получаем unsafe данные пользователя
      const initDataUnsafe = tg.initDataUnsafe;
      if (initDataUnsafe) {
        // Строим объект данных пользователя
        this.userData = {
          telegramId: initDataUnsafe.user.id,
          username: initDataUnsafe.user.username,
          firstName: initDataUnsafe.user.first_name,
          lastName: initDataUnsafe.user.last_name,
          photoUrl: initDataUnsafe.user.photo_url,
        };

        // Логируем данные пользователя (для отладки)
        console.log('User Data:', this.userData);

        // Отправляем данные пользователя на сервер
        this.http
          .post('http://localhost:5173/api/user', this.userData)
          .subscribe(
            (response) => {
              console.log('User data saved:', response);
            },
            (error) => {
              console.error('Error saving user data:', error);
            }
          );
      }

      tg.expand(); // Расширяем WebApp на весь экран
    }
  }

  getProgressColor(progress: number): string {
    if (progress < 30) {
      return '#FF0000';
    } else if (progress >= 30 && progress < 70) {
      return '#63B9F0';
    } else {
      return '#63B9F0';
    }
  }

  tabs = [
    { key: 'percs', label: 'Percs' },
    { key: 'missions', label: 'Missions' },
  ];

  activeTab: string = 'percs';

  missions = [
    {
      image: '../assets/img/telegram.png',
      title: 'follow beerBot on Telegram',
      reward: '+250 bp',
      action: 'start',
    },
    {
      image: '../assets/img/telegram.png',
      title: 'join our Telegram community',
      reward: '+250 bp',
      action: 'start',
    },
    {
      image: '../assets/img/telegram.png',
      title: 'follow beerBot on Instagram',
      reward: '+250 bp',
      action: 'start',
    },
    {
      image: '../assets/img/telegram.png',
      title: 'follow beerBot on Tik Tok',
      reward: '+250 bp',
      action: 'start',
    },
  ];

  setActiveTab(tabKey: string): void {
    this.activeTab = tabKey;
  }
}
