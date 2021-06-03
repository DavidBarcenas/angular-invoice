import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from '../../../shared/services/ui.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {
  form: FormGroup;
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
    private invoiceService: InvoiceService
  ) {
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

    const newInvoice = this.form.value;
    newInvoice.createdAt = new Date();
    newInvoice.status = 'Draft';
    newInvoice.total = 0;

    this.invoiceItems.value.map((item) => {
      item.total = item.quantity * item.price;
      newInvoice.total += item.total;
    });

    this.invoiceService.createInvoice(this.form.value).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log('errores', error.message)
    );
  }

  closeForm(): void {
    this.uiService.closeForm();
  }

  get termsCatalog(): string[] {
    return this.invoiceService.termsCatalog;
  }

  get invoiceItems(): FormArray {
    return this.form.controls.items as FormArray;
  }

  get animateFormClose() {
    return this.uiService.animationCloseForm;
  }
}
