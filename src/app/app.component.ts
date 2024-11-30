import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './CommonUi/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { TelegramAuthorizationComponent } from './pages/telegram-authorization/telegram-authorization.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/AuthService';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    HttpClientModule,
    TelegramAuthorizationComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beerBotFront';
  isAuthorized = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthorized = this.authService.getAuthorizationStatus();
  }
}
