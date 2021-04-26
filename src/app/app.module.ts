import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CreditsComponent } from './shared/components/credits/credits.component';
import { HomeComponent } from './invoices/pages/home/home.component';
import { HeaderComponent } from './invoices/components/header/header.component';
import { InvoiceListComponent } from './invoices/components/invoice-list/invoice-list.component';
import { InvoiceItemComponent } from './invoices/components/invoice-item/invoice-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CreditsComponent,
    HomeComponent,
    HeaderComponent,
    InvoiceListComponent,
    InvoiceItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
