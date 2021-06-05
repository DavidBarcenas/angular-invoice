import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable, Renderer2, RendererFactory2, } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  private renderer: Renderer2;
  private body = this.document.body;
  initialHeight = window.innerHeight;
  animationCloseForm = false;
  openFilter = false;
  openForm = false;
  activeFilter: EventEmitter<string> = new EventEmitter();

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
      e.target?.offsetParent?.className !== 'header-filter--dropdown' &&
      !e.target.closest('.dropdown')
    ) {
      this.openFilter = false;
    }
  }

  toggleForm(): void {
    const paddingRight = parseInt( window.getComputedStyle(this.body).paddingRight, 10);
    const scrollBarWidth = window.innerWidth - this.document.documentElement.clientWidth;
    const offset = paddingRight + scrollBarWidth;
    this.openForm = !this.openForm;

    if (this.openForm) {
      this.renderer.addClass(this.body, 'backdrop');
      if (offset) {
        this.renderer.setStyle(this.body, 'paddingRight', offset + 'px');
      }
    } else {
      this.renderer.removeClass(this.body, 'backdrop');
      this.renderer.removeStyle(this.body, 'paddingRight');
    }
  }

  closeForm(): void {
    this.animationCloseForm = true;
    setTimeout(() => {
      this.openForm = false;
      this.animationCloseForm = false;
      this.renderer.removeClass(this.body, 'backdrop');
      this.renderer.removeStyle(this.body, 'paddingRight');
    }, 200);
  }
}
