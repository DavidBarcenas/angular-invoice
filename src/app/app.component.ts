import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoices/services/invoice.service';
import { UIService } from './shared/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public uiService: UIService,
    private invoicesService: InvoiceService
  ) {}

  ngOnInit() {
    this.invoicesService.getCatalogs().subscribe((resp) => {
      this.invoicesService.termsCatalog = resp[0].paymentTerms;
      this.invoicesService.statusCatalog.next(resp[0].status);
    });
  }

  get openForm() {
    return this.uiService.openForm;
  }
}
