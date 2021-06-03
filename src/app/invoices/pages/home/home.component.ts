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
  invoices$: Observable<Invoice[]>;
  statusCatalog: string[] = [];

  constructor(private invoicesService: InvoiceService) {}

  ngOnInit(): void {
    this.invoices$ = this.invoicesService.getInvoices();
    this.invoicesService.getCatalogs().subscribe((resp) => {
      this.statusCatalog = resp[0].status;
      this.invoicesService.termsCatalog = resp[0].paymentTerms;
    });
  }

  filterByStatus(status: string): void {
    this.invoices$ = this.invoicesService.getInvoices(status?.toLowerCase());
  }
}
