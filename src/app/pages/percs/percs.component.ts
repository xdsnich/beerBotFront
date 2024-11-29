import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-percs',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './percs.component.html',
  styleUrl: './percs.component.scss',
})
export class PercsComponent {}
