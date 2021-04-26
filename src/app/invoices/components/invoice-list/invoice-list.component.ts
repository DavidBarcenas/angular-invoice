import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  @Input() invoices: Observable<Invoice>;

  constructor() {}

  ngOnInit(): void {}
}
