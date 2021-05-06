import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  get openModal() {
    return this.modalService.openModal;
  }

  get animationCloseModal() {
    return this.modalService.animationCloseModal;
  }

  constructor(private modalService: ModalService) {}

  closeModal(): void {
    this.modalService.close();
  }
}
