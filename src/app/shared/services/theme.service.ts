import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'THEME';
  private readonly DARK_THEME_VALUE = 'DARK';
  private readonly LIGHT_THEME_VALUE = 'LIGHT';
  private readonly DARK_THEME_CLASS_NAME = 'dark-theme';

  darkThemeSelected = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.darkThemeSelected =
      localStorage.getItem(this.THEME_KEY) === this.DARK_THEME_VALUE;
  }

  setThemeOnStart(): void {
    if (this.darkThemeSelected) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  public toggleTheme(): void {
    if (this.darkThemeSelected) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  private setLightTheme(): void {
    localStorage.setItem(this.THEME_KEY, this.LIGHT_THEME_VALUE);
    this.document.body.classList.remove(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = false;
  }

  private setDarkTheme(): void {
    localStorage.setItem(this.THEME_KEY, this.DARK_THEME_VALUE);
    this.document.body.classList.add(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = true;
  }
}
