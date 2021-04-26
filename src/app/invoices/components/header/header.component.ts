import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filters: Filter[] = [
    {
      name: 'Paid',
      checked: false,
    },
    {
      name: 'Pending',
      checked: false,
    },
    {
      name: 'Draft',
      checked: false,
    },
  ];

  constructor(public filterService: FilterService) {}

  toggleFilter(filterName: string, idx: number) {
    this.filters[idx].checked = !this.filters[idx].checked;

    if (this.filters[idx].checked) {
      this.filterService.activeFilter.emit(filterName);
    } else {
      this.filterService.activeFilter.emit(null);
    }

    this.filters.map((f) => {
      if (f.name !== filterName) {
        f.checked = false;
      }
    });
  }
}

interface Filter {
  name: string;
  checked: boolean;
}
