import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  openModal = false;
  animationCloseModal = false;

  open(): void {
    this.openModal = true;
  }

  close(): void {
    this.animationCloseModal = true;
    setTimeout(() => {
      this.openModal = false;
      this.animationCloseModal = false;
    }, 200);
  }
}
