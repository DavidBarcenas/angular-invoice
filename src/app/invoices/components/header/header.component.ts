import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UIService } from '../../../shared/services/ui.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() filter = new EventEmitter<string>();
  filters: Filter[] = [];

  constructor(
    private uiService: UIService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
       this.invoiceService.statusCatalog.subscribe(data => {
        this.filters = data.map((item: string) => ({
          name: item,
          checked: false,
        }));

      })

  }

  toggleFilter(filterName: string, idx: number): void {
    this.filters[idx].checked = !this.filters[idx].checked;

    if (this.filters[idx].checked) {
      this.filter.emit(filterName);
    } else {
      this.filter.emit(null);
    }

    this.filters.map((f) => {
      if (f.name !== filterName) {
        f.checked = false;
      }
    });
  }

  showFilter(): void {
    this.uiService.toggleFilter();
  }

  closeFilter(event: any): void {
    this.uiService.closeFilter(event);
  }

  toggleForm(): void {
    this.uiService.toggleForm();
    this.invoiceService.invoiceToEdit = null;
  }

  get counter() {
    return this.invoiceService.invoiceCounter;
  }

  get openFilter() {
    return this.uiService.openFilter;
  }
}

interface Filter {
  name: string;
  checked: boolean;
}
