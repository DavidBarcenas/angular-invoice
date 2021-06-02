import { HttpClient, HttpParams } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catalog } from '../interfaces/catalog.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getInvoices(status?: string): Observable<any[]> {
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }

    return this.http.get<Invoice[]>(
      `${environment.base_url}${environment.invoice_endpoint}`,
      { params }
    );
  }

  getInvoice(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(
      `${environment.base_url}${environment.invoice_endpoint}/${id}`
    );
  }

  getCatalogs(): Observable<Catalog> {
    return this.http.get<Catalog>(
      `${environment.base_url}${environment.catalogs_endpoint}`
    );
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(
      `${environment.base_url}${environment.invoice_endpoint}`,
      invoice
    );
  }
}
