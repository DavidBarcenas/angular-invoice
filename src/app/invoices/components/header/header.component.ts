import { Component, Input, OnInit } from '@angular/core';
import { UiActionsService } from '../../services/ui-actions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public UiActionsService: UiActionsService) {}

  ngOnInit(): void {}
}
