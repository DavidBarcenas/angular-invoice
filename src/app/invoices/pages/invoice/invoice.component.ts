import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoice: Invoice;

  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.invoiceService.getInvoice(id)))
      .subscribe((invoice) => {
        console.log(invoice);
        this.invoice = invoice;
      });
  }

  openModal() {
    this.modalService.open();
  }
}
