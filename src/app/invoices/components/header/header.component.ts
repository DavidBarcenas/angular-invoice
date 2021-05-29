import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Output() filter = new EventEmitter<string>();
  @Input() statusCatalog = [];

  filters: Filter[] = [];

  constructor(private uiService: UIService) {}

  ngOnChanges(change: SimpleChanges): void {
    if (change.statusCatalog.currentValue) {
      this.filters = this.statusCatalog.map((item: string) => ({
        name: item,
        checked: false,
      }));
    }
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
  }

  get openFilter() {
    return this.uiService.openFilter;
  }
}

interface Filter {
  name: string;
  checked: boolean;
}
