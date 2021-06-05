import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '../../interfaces/invoice.interface';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent implements OnInit {
  @Input() invoices: Invoice[];
  activeFilter: string;

  constructor(private uiService: UIService) {}

  ngOnInit(): void {
    this.uiService.activeFilter.subscribe(
      (filter) => (this.activeFilter = filter)
    );
  }
}
