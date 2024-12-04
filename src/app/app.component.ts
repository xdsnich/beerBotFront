import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './CommonUi/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/AuthService';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beerBotFront';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initTelegram();
  }
}
