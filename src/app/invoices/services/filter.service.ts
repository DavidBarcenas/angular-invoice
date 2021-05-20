import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  openFilter: boolean = false;
  activeFilter: EventEmitter<string> = new EventEmitter();
  openForm: boolean = false;
  animationCloseForm = false;

  toggleFilter(): void {
    this.openFilter = !this.openFilter;
  }

  closeFilter(e: any): void {
    if (
      e.target.parentNode &&
      e.target.parentNode.className !== 'header-btn--filter' &&
      e.target.parentNode.className !== 'header-filter--dropdown' &&
      !e.target.closest('.dropdown')
    ) {
      this.openFilter = false;
    }
  }

  toggleForm() {
    this.openForm = !this.openForm;
  }

  closeForm() {
    this.animationCloseForm = true;
    setTimeout(() => {
      this.openForm = false;
      this.animationCloseForm = false;
    }, 200);
  }
}
