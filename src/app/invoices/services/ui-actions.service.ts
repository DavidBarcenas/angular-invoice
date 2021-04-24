import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiActionsService {
  openFilter: boolean = false;

  toggleFilter(): void {
    this.openFilter = !this.openFilter;
  }

  closeFilter(e) {
    // console.log(e.target.closest('.dropdown').length);
    if (!e.target.closest('.dropdown')?.length) {
      // console.log(e);
      this.openFilter = false;
    }
  }
}
