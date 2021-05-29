import { Component, Input, OnInit } from '@angular/core';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {
  @Input() termsCatalog = [];

  constructor(private uiService: UIService) {}

  closeForm(): void {
    this.uiService.closeForm();
  }

  get openForm() {
    return this.uiService.openForm;
  }

  get animateFormClose() {
    return this.uiService.animationCloseForm;
  }
}
