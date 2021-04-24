import { Component } from '@angular/core';
import { UiActionsService } from './invoices/services/ui-actions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public uiActionsService: UiActionsService) {}
}
