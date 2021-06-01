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
  errors = {
    senderAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    clientName: false,
    clientEmail: false,
    clientAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    paymentDue: false,
    paymentTerms: false,
    description: false,
  };

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
      name: [''],
      quantity: [''],
      price: [null],
      total: [0],
    });
    this.invoiceItems.push(item);
  }

  deleteItem(id: number): void {
    this.invoiceItems.removeAt(id);
  }

  handleFormSubmit(): void {
    this.form.markAllAsTouched();
    console.log(this.form.value);
  }

  closeForm(): void {
    this.uiService.closeForm();
  }

  validateControl(group: string, controlName: string): void {
    if (group) {
      this.errors[group][controlName] =
        this.form.controls[group].get(controlName).errors &&
        (this.form.controls[group].get(controlName).dirty ||
          this.form.controls[group].get(controlName).touched);
    } else {
      this.errors[controlName] =
        this.form.controls[controlName].errors &&
        (this.form.controls[controlName].dirty ||
          this.form.controls[controlName].touched);
    }
  }

  get invoiceItems(): FormArray {
    return this.form.controls.items as FormArray;
  }

  get animateFormClose() {
    return this.uiService.animationCloseForm;
  }
}
