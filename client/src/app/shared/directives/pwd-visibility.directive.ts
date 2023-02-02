import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[toggle]',
})
export class PwdVisibilityDirective {
  private _shown = false;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;
    const images = document.createElement('img');
    images.src = 'assets/images/oeil.svg';
    images.style.width = '32PX';
    images.style.height = 'auto';
    images.addEventListener('click', () => {
      this.toggle(images);
    });
    images.addEventListener('mouseover', () => {
      images.style.cursor = 'pointer';
    });
    parent.appendChild(images);
  }

  toggle(images: HTMLElement) {
    if (!this._shown) {
      this._shown = true;
      this.el.nativeElement.setAttribute('type', 'text');
      images.setAttribute('src', 'assets/images/oeil-masque.svg');
    } else {
      this._shown = false;
      this.el.nativeElement.setAttribute('type', 'password');
      images.setAttribute('src', 'assets/images/oeil.svg');
    }
  }
}
