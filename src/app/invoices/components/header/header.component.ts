import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() filter = new EventEmitter<string>();
  @Input() statusCatalog = [];

  filters: Filter[] = [
    { name: 'Paid', checked: false },
    { name: 'Pending', checked: false },
    { name: 'Draft', checked: false },
  ];

  constructor(private uiService: UIService) {}

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
  }

  get openFilter() {
    return this.uiService.openFilter;
  }
}

interface Filter {
  name: string;
  checked: boolean;
}
