import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UIService } from 'src/app/shared/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit, OnDestroy {
  invoice: Invoice;
  activatedRoute$: Subscription;
  refreshInvoices$: Subscription;
  updateInvoices$: Subscription;
  deleteInvoices$: Subscription;

  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,
    private uiService: UIService,
    private toastrService: ToastrService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.activatedRoute$ = this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.invoiceService.getInvoice(id)))
      .subscribe((invoice) => {
        this.invoice = invoice
        this.setTitle()
      });

    this.refreshInvoices$ = this.invoiceService.refreshInvoices$
      .pipe(switchMap(() => this.invoiceService.getInvoice(this.invoice._id)))
      .subscribe((invoice) => this.invoice = invoice)
  }

  markAsPaid(): void {
    this.invoice.status = 'Paid'
    const {_id, __v, ...rest} = this.invoice
    this.updateInvoices$ = this.invoiceService.updateInvoice(this.invoice._id, rest)
      .subscribe(() => this.toastrService.success('Invoice updated successfully'))
  }

  openModal(): void {
    this.modalService.open();
  }

  closeModal(): void {
    this.modalService.close();
  }

  handleEdit(): void {
    this.uiService.toggleForm();
    this.invoiceService.invoiceToEdit = this.invoice;
  }

  handleDelete(): void {
    this.deleteInvoices$ = this.invoiceService.deleteInvoice(this.invoice._id)
      .subscribe(() => {
        this.toastrService.success('Invoice deleted successfully')
      })
    this.modalService.close();
    this.router.navigate(['/']);
  }

  setTitle(): void {
    const id = this.invoice._id.substring(0,6).toUpperCase()
    this.titleService.setTitle(`Invoice | #${id}`)
  }

  ngOnDestroy(): void {
    this.activatedRoute$?.unsubscribe();
    this.refreshInvoices$?.unsubscribe();
    this.updateInvoices$?.unsubscribe();
    this.deleteInvoices$?.unsubscribe();
  }
}
