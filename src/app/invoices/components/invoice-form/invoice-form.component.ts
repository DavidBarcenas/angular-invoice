import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {
  @Input() termsCatalog = [];
  form: FormGroup;
  showErrorMessage = false;

  constructor(private fb: FormBuilder, private uiService: UIService) {
    this.form = this.fb.group({
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientName: ['', Validators.required],
      clientEmail: ['', Validators.required],
      clientAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      paymentDue: ['', Validators.required],
      paymentTerms: [30, Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([], Validators.required),
    });
  }

  addItem(): void {
    const item: FormGroup = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: [null, [Validators.required]],
      total: [0],
    });
    this.invoiceItems.push(item);
  }

  deleteItem(id: number): void {
    this.invoiceItems.removeAt(id);
  }

  handleFormSubmit(): void {
    this.showErrorMessage = this.form.invalid;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
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
