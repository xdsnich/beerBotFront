import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrinkCalendarService } from '../../services/DrinkCalendarService';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  beerCount: number = 34647;
  tabs: string[] = ['generals', 'calendar'];
  activeTab: string = 'generals';

  achievements: string[] = [
    '10 liters of beer',
    '50 liters of beer',
    'Drunken Friday',
  ];
  leaderboard = [
    { name: 'User 1', score: 100, place: 1 },
    { name: 'User 2', score: 95, place: 2 },
    { name: 'User 3', score: 90, place: 3 },
  ];
  currentMonth: Date = new Date();
  selectedDate: string = '';
  litersDrunk: number | null = null;
  calendarEntries: { date: string; liters: number }[] = [];
  daysInMonth: { date: Date; liters?: number }[] = [];
  showAchievements: boolean = false;
  showLeaderboard = false;
  showDrinkResults = false;
  showButtons = true;

  constructor(
    private drinkService: DrinkCalendarService,
    private http: HttpClient
  ) {
    this.loadCalendarDays();
    this.fetchCalendarEntries();
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab !== 'generals') {
      this.showAchievements = false;
    }
  }

  toggleAchievements(): void {
    this.showAchievements = !this.showAchievements;
  }

  toggleLeaderboard() {
    this.showLeaderboard = !this.showLeaderboard;
    this.showAchievements = false;
    this.showDrinkResults = false;
    this.showButtons = false; 
  }

  toggleDrinkResults() {
    this.showDrinkResults = !this.showDrinkResults;
    this.showAchievements = false;
    this.showLeaderboard = false;
  }

  closeLeaderboard() {
    this.showLeaderboard = false;
    this.showAchievements = true;
    this.showButtons = true; 
  }

  navigateMonth(direction: number): void {
    const newMonth = this.currentMonth.getMonth() + direction;
    this.currentMonth.setMonth(newMonth);
    this.loadCalendarDays();
  }

  loadCalendarDays(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth: { date: Date; liters?: number }[] = [];

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const day = new Date(year, month, i);
      const entry = this.calendarEntries.find(
        (entry) => entry.date === day.toISOString().split('T')[0]
      );
      daysInMonth.push({
        date: day,
        liters: entry ? entry.liters : undefined,
      });
    }

    this.daysInMonth = daysInMonth;
    this.currentMonth.setMonth(month);
  }

  selectDate(day: { date: Date; liters?: number }): void {
    this.selectedDate = day.date.toISOString().split('T')[0];
    this.litersDrunk = day.liters || null;
  }

  addCalendarEntry(): void {
    if (this.selectedDate && this.litersDrunk !== null) {
      const existingEntry = this.calendarEntries.find(
        (entry) => entry.date === this.selectedDate
      );
      if (existingEntry) {
        existingEntry.liters = this.litersDrunk;
      } else {
        this.calendarEntries.push({
          date: this.selectedDate,
          liters: this.litersDrunk,
        });
      }
      this.loadCalendarDays();
      this.selectedDate = '';
      this.litersDrunk = null;
    }
  }

  get currentMonthYear(): string {
    const options = { year: 'numeric', month: 'long' } as const;
    return this.currentMonth.toLocaleDateString('en-US', options);
  }

  fetchCalendarEntries(): void {
    const userId = 1; // Замените на реальный идентификатор пользователя
    this.drinkService.getEntries(userId).subscribe((entries: any) => {
      this.calendarEntries = entries;
      this.loadCalendarDays(); // Обновить календарь с загруженными данными
    });
  }

  saveCalendarEntry(): void {
    if (this.selectedDate && this.litersDrunk !== null) {
      const userId = 1; // Замените на реальный идентификатор пользователя
      const entry = {
        userId,
        date: this.selectedDate,
        liters: this.litersDrunk,
      };

      this.drinkService.addEntry(entry).subscribe(() => {
        this.fetchCalendarEntries(); // Перезагрузить данные после сохранения
        this.selectedDate = '';
        this.litersDrunk = null;
      });
    }
  }
}
