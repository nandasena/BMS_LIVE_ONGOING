import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
 selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {
//  // Allow decimal numbers and negative values
//  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
//  // Allow key codes for special events. Reflect :
//  // Backspace, tab, end, home
//  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', '-' ];

// constructor(private el: ElementRef) {
//  }
//  @HostListener('keydown', [ '$event' ])
//  onKeyDown(event: KeyboardEvent) {
//  // Allow Backspace, tab, end, and home keys
//  if (this.specialKeys.indexOf(event.key) !== -1) {
//  return;
//  }
//  let current: string = this.el.nativeElement.value;
//  let next: string = current.concat(event.key);
//  if (next && !String(next).match(this.regex)) {
//  event.preventDefault();
//  }
//  }


constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
  @HostListener('change', ['$event']) onChange(event) {
    const initalValue = this._el.nativeElement.value;
    let enterNumber =Number(initalValue);
    if(enterNumber==0)
    {
      this._el.nativeElement.value=1
    }
    event.stopPropagation();
  }

}
