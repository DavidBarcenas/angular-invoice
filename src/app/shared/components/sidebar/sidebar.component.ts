import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private ICON_SUN = 'icon-sun';
  private ICON_MOON = 'icon-moon';

  constructor(private themeService: ThemeService) {
    this.themeService.setThemeOnStart();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkTheme(): boolean {
    return this.themeService.darkThemeSelected;
  }

  get themeIcon(): string {
    return `../../../assets/img/${
      this.isDarkTheme ? this.ICON_SUN : this.ICON_MOON
    }.svg`;
  }
}
