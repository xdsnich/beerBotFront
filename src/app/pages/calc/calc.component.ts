import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { HumanComponent } from "../../ThreD/human/human.component";
@Component({
  selector: 'app-calc',
  standalone: true,
  imports: [CommonModule, HumanComponent],
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
})
export class CalcComponent {
  showTip = false;

  constructor(private router: Router) {}

  toggleTip() {
    this.showTip = !this.showTip;
  }

  selectOption(option: string) {
    if (option === 'quick') {
      this.router.navigate(['/quick-calculation']);
    } else if (option === 'deep') {
      this.router.navigate(['/deep-calculation']);
    }
  }
}
