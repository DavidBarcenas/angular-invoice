import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices: Invoice[] = []

  constructor(private invoicesService: InvoiceService, private titleService: Title) {}

  ngOnInit(): void {
    this.invoicesService.invoiceToEdit = null;
    if(this.invoicesService.activeFilter) {
      this.filterByStatus(this.invoicesService.activeFilter )
    } else {
      this.invoicesService.getInvoices()
        .subscribe(invoices => {
          console.log('entra home normal')
          this.setInvoices(invoices)
        });
    }

    this.invoicesService.refreshInvoices$
      .pipe(switchMap(() => this.invoicesService.getInvoices()))
      .subscribe(invoices => {
        console.log('entra home refresh')
        this.setInvoices(invoices)
      })
  }

  filterByStatus(status: string): void {
    this.invoicesService.activeFilter = status;
    this.invoicesService.getInvoices(status?.toLowerCase())
      .subscribe(invoices => {
        console.log('entra status')
        this.setInvoices(invoices)
      });
  }

  setInvoices(invoices: Invoice[]) {
    this.invoices = invoices
    this.invoicesService.invoiceCounter = this.invoices.length
    this.titleService.setTitle(`Invoices (${this.invoices.length})`)
  }
}
