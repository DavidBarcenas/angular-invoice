import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  invoices: Invoice[] = []
  getInvoices$: Subscription;
  refreshInvoices$: Subscription;
  filterInvoices$: Subscription;

  constructor(private invoicesService: InvoiceService, private titleService: Title) {}

  ngOnInit(): void {
    this.invoicesService.invoiceToEdit = null;
    if(this.invoicesService.activeFilter) {
      this.filterByStatus(this.invoicesService.activeFilter)
    } else {
      this.getInvoices$ = this.invoicesService.getInvoices()
        .subscribe(invoices => this.setInvoices(invoices) );
    }

    this.refreshInvoices$ = this.invoicesService.refreshInvoices$
      .pipe(switchMap(() => this.invoicesService.getInvoices()))
      .subscribe(invoices => this.setInvoices(invoices))
  }

  filterByStatus(status: string): void {
    this.invoicesService.activeFilter = status;
    this.filterInvoices$ = this.invoicesService.getInvoices(status)
      .subscribe(invoices => this.setInvoices(invoices));
  }

  setInvoices(invoices: Invoice[]) {
    this.invoices = invoices
    this.invoicesService.invoiceCounter = this.invoices.length
    this.titleService.setTitle(`Invoices (${this.invoices.length})`)
  }

  ngOnDestroy(): void {
    this.getInvoices$?.unsubscribe()
    this.refreshInvoices$?.unsubscribe()
    this.filterInvoices$?.unsubscribe()
  }
}
