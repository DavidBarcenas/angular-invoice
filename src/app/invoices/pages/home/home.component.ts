import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices$: Observable<Invoice[]>;

  constructor(private invoicesService: InvoiceService) {}

  ngOnInit(): void {
    this.invoices$ = this.invoicesService.getInvoices();
  }
}
