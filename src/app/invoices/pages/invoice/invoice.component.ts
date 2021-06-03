import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UIService } from 'src/app/shared/services/ui.service';

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
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.invoiceService.getInvoice(id)))
      .subscribe((invoice) => (this.invoice = invoice));
  }

  openModal(): void {
    this.modalService.open();
  }

  closeModal(): void {
    this.modalService.close();
  }

  handleEdit() {
    this.uiService.toggleForm();
  }

  handleDelete() {
    // TODO: remove invoice from database
    this.modalService.close();
    this.router.navigate(['/']);
  }
}
