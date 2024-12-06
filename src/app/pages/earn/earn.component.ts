import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HumanComponent } from '../../ThreD/human/human.component';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-earn',
  standalone: true,
  imports: [CommonModule,  FormsModule, HumanComponent],
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.scss'],
})
export class EarnComponent implements OnInit {
  userData: any = {};
  progress: number = 80;

  constructor(private authService: AuthService) {}

   ngOnInit(): void {
    this.authService.initTelegram();
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
  buttonText: string = 'start farming'; 

  toggleFarm() {
    this.buttonText = this.buttonText === 'start farming' ? 'stop farming' : 'start farming';
  }

  setActiveTab(tabKey: string): void {
    this.activeTab = tabKey;
  }
}
