import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private ICON_SUN = 'icon-sun';
  private ICON_MOON = 'icon-moon';

  showCredits = false;

  constructor(private themeService: ThemeService) {
    this.themeService.setThemeOnStart();
  }

  handleTheme(): void {
    this.themeService.toggleTheme();
  }

  handleShowCredits(): void {
    this.showCredits = true;
  }

  handleCloseCredits(closeCredits: boolean): void {
    this.showCredits = closeCredits;
  }

  get isDarkTheme(): boolean {
    return this.themeService.darkThemeSelected;
  }

  get themeIcon(): string {
    return `./assets/img/${
      this.isDarkTheme ? this.ICON_SUN : this.ICON_MOON
    }.svg`;
  }
}
