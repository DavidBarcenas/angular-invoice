import { HttpClient } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<any[]> {
    return this.http.get<Invoice[]>('./assets/data/data.json');
  }

  getInvoice(id: string): Observable<Invoice> {
    return this.http.get<Invoice[]>('./assets/data/data.json').pipe(
      map((arr) => {
        return arr.find((invoice) => {
          return invoice.id === id;
        });
      })
    );
  }
}
