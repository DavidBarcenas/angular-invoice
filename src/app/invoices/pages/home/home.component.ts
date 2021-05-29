import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../../interfaces/catalog.interface';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  statusCatalog: Status[] = [];
  termsCatalog: string[] = [];

  constructor(private invoicesService: InvoiceService) {}

  ngOnInit(): void {
    this.invoices$ = this.invoicesService.getInvoices();
    this.invoicesService.getCatalogs().subscribe((resp) => {
      const status = [resp[0].status].map((item) => ({
        name: item,
        checked: false,
      }));
      console.log(status);
      this.statusCatalog = [resp.status];
      this.termsCatalog = resp[0].paymentTerms;
    });
  }

  filterByStatus(status: string): void {
    this.invoices$ = this.invoicesService.getInvoices(status?.toLowerCase());
  }
}
