import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent {
  @Output()
  closeCreditsScreen: EventEmitter<boolean> = new EventEmitter<boolean>();

  animateClose: boolean = false;

  links = [
    {
      path:
        'https://www.frontendmentor.io/solutions/invoice-app-react-nextjs-styledcomponents-formik-framer-motion-3y1EaxPtj',
      name: 'Visit solution page',
    },
    {
      path: 'https://github.com/ApplePieGiraffe/invoice-app',
      name: 'Visit git repo',
    },
    {
      path: 'https://www.frontendmentor.io/profile/ApplePieGiraffe',
      name: 'Visit Frontend Mentor profile',
    },
  ];

  handleClose(): void {
    this.animateClose = true;
    /**
     * A timeout is added to execute the animation
     * at the closing of the screen
     */
    setTimeout(() => {
      this.animateClose = false;
      this.closeCreditsScreen.emit(false);
    }, 200);
  }
}
