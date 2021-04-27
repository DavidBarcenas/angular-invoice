import { Component, Input } from '@angular/core';
import { Invoice } from '../../interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
})
export class InvoiceItemComponent {
  @Input() invoice: Invoice;
  @Input() idx: number;
}
