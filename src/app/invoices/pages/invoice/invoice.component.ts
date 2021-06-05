import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UIService } from 'src/app/shared/services/ui.service';
import { ToastrService } from 'ngx-toastr';

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
    private modalService: ModalService,
    private router: Router,
    private uiService: UIService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.invoiceService.getInvoice(id)))
      .subscribe((invoice) => (this.invoice = invoice));

      this.invoiceService.updatedInvoice$
        .pipe(switchMap(() => this.invoiceService.getInvoice(this.invoice._id)))
        .subscribe((invoice) => {
          this.invoice = invoice
          this.toastrService.success('Invoice updated successfully')
        })
  }

  markAsPaid(): void {
    this.invoice.status = 'Paid'
    const {_id, __v, ...rest} = this.invoice
    this.invoiceService.updateInvoice(this.invoice._id, rest).subscribe()
  }

  openModal(): void {
    this.modalService.open();
  }

  closeModal(): void {
    this.modalService.close();
  }

  handleEdit() {
    this.uiService.toggleForm();
    this.invoiceService.invoiceToEdit = this.invoice;
  }

  handleDelete() {
    // TODO: remove invoice from database
    this.modalService.close();
    this.router.navigate(['/']);
  }
}
