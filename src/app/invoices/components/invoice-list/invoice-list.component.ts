import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../interfaces/invoice.interface';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent implements OnInit {
  @Input() invoices: Observable<Invoice>;
  activeFilter: string;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.activeFilter.subscribe(
      (filter) => (this.activeFilter = filter)
    );
  }
}
