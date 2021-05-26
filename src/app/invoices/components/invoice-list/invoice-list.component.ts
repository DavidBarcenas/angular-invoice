import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../interfaces/invoice.interface';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent implements OnInit {
  @Input() invoices: Observable<Invoice>;
  activeFilter: string;

  constructor(private uiService: UIService) {}

  ngOnInit(): void {
    this.uiService.activeFilter.subscribe(
      (filter) => (this.activeFilter = filter)
    );
  }
}
