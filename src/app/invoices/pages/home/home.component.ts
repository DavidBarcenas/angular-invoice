import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/services/ui.service';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices: Invoice[] = []

  constructor(private invoicesService: InvoiceService) {}

  ngOnInit(): void {
    this.invoicesService.getInvoices().subscribe(invoices => this.invoices = invoices);

    this.invoicesService.refreshInvoices$.subscribe(() => {
      this.invoicesService.getInvoices().subscribe(invoices => this.invoices = invoices);
    })
  }

  filterByStatus(status: string): void {
    this.invoicesService.getInvoices(status?.toLowerCase()).subscribe(invoices => this.invoices = invoices);
  }
}
