import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './invoices/pages/home/home.component';
import { InvoiceComponent } from './invoices/pages/invoice/invoice.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
