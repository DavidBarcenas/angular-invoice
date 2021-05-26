import { DOCUMENT } from '@angular/common';
import {
  EventEmitter,
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  RendererType2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  openFilter: boolean = false;
  activeFilter: EventEmitter<string> = new EventEmitter();
  openForm: boolean = false;
  animationCloseForm = false;
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  toggleFilter(): void {
    this.openFilter = !this.openFilter;
  }

  closeFilter(e: any): void {
    if (
      e.target.parentNode &&
      e.target.parentNode.className !== 'header-btn--filter' &&
      e.target.parentNode.className !== 'header-filter--dropdown' &&
      !e.target.closest('.dropdown')
    ) {
      this.openFilter = false;
    }
  }

  toggleForm() {
    this.openForm = !this.openForm;

    if (this.openForm) {
      // this.document.body.classList.add('backdrop');
      this.renderer.addClass(this.document.body, 'backdrop');
    } else {
      // this.document.body.classList.remove('backdrop');
      this.renderer.removeClass(this.document.body, 'backdrop');
    }
  }

  closeForm() {
    this.animationCloseForm = true;
    setTimeout(() => {
      this.openForm = false;
      this.animationCloseForm = false;
      this.document.body.classList.remove('backdrop');
    }, 200);
  }
}
