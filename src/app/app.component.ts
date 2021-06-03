import { Component } from '@angular/core';
import { InvoiceService } from './invoices/services/invoice.service';
import { UIService } from './shared/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public uiService: UIService,
    private invoicesService: InvoiceService
  ) {}

  get openForm() {
    return this.uiService.openForm;
  }
}
