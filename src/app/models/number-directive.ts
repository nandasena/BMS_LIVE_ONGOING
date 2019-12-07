import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
 selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {
  
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
