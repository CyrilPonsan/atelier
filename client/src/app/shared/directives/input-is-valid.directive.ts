import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputIsValid]',
})
export class InputIsValidDirective {
  @Input('inputIsValid') value!: boolean;

  constructor(private elem: ElementRef) {}

  @HostListener('focusout') onBlur() {
    if (this.value) {
      this.elem.nativeElement.style.border = 'solid 1px green';
    } else {
      this.elem.nativeElement.style.border = 'solid 1px red';
    }
  }
  /*
  @HostListener('keyup') onChange() {
    if (this.value) {
      this.elem.nativeElement.style.border = 'solid 1px green';
    } else {
      this.elem.nativeElement.style.border = 'solid 1px red';
    }
  } */
}
