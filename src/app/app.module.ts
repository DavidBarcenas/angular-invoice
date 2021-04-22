import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CreditsComponent } from './shared/components/credits/credits.component';
import { HomeComponent } from './invoices/pages/home/home.component';
import { HeaderComponent } from './invoices/components/header/header.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, CreditsComponent, HomeComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
