import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {
  @Input() termsCatalog = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private uiService: UIService) {
    this.form = this.fb.group({
      senderAddress: this.fb.group({
        street: [''],
        city: [''],
        postCode: [''],
        country: [''],
      }),
      clientName: [''],
      clientEmail: [''],
      clientAddress: this.fb.group({
        street: [''],
        city: [''],
        postCode: [''],
        country: [''],
      }),
      paymentDue: [''],
      paymentTerms: [''],
      description: [''],
      items: this.fb.array([]),
    });
  }

  addItem(): void {
    const item: FormGroup = this.fb.group({
      name: [''],
      quantity: [''],
      price: [null],
      total: [0],
    });
    this.invoiceItems.push(item);
    console.log(this.invoiceItems);
  }

  deleteItem(id: number): void {
    this.invoiceItems.removeAt(id);
  }

  handleFormSubmit(): void {
    console.log(this.form.value);
  }

  closeForm(): void {
    this.uiService.closeForm();
  }

  get invoiceItems(): FormArray {
    return this.form.controls.items as FormArray;
  }

  get animateFormClose() {
    return this.uiService.animationCloseForm;
  }
}
