import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CreditsComponent } from './shared/components/credits/credits.component';
import { HomeComponent } from './invoices/pages/home/home.component';
import { HeaderComponent } from './invoices/components/header/header.component';
import { InvoiceListComponent } from './invoices/components/invoice-list/invoice-list.component';
import { InvoiceItemComponent } from './invoices/components/invoice-item/invoice-item.component';
import { FilterPipe } from './invoices/pipes/filter.pipe';
import { InvoiceComponent } from './invoices/pages/invoice/invoice.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { InvoiceFormComponent } from './invoices/components/invoice-form/invoice-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CreditsComponent,
    HomeComponent,
    HeaderComponent,
    InvoiceListComponent,
    InvoiceItemComponent,
    FilterPipe,
    InvoiceComponent,
    ModalComponent,
    InvoiceFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
