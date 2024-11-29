import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanComponent } from "../../../ThreD/human/human.component";
@Component({
  selector: 'app-quick-calculation',
  standalone: true,
  imports: [CommonModule, HumanComponent],
  templateUrl: './quick-calculation.component.html',
  styleUrl: './quick-calculation.component.scss',
})
export class QuickCalculationComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    console.log('Selected option:', option);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const isClickInside = target.closest('.dropdown');

    if (!isClickInside) {
      this.isOpen = false;
    }
  }
}
