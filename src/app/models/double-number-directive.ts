import { Directive, ElementRef, HostListener,Input } from '@angular/core';

@Directive({
 selector: 'input[double-number-directive]'
})
export class DoubleNumberDirective {
  
constructor(private _el: ElementRef) { }

//   @HostListener('input', ['$event']) onInputChange(event) {
//     const initalValue = this._el.nativeElement.value;
//    //  this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
//      this._el.nativeElement.value = initalValue.replace(/^(\d*\.)?\d+$/, '');
//     if ( initalValue !== this._el.nativeElement.value) {
//         console.log("come here");
//         event.stopPropagation();
//     }
//   }

  @Input('numericType') numericType: string; // number | decimal

    private regex = {
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    };

    private specialKeys = {
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };
    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {

        if (this.specialKeys[this.numericType].indexOf(event.key) !== -1) {
            return;
        }
        // Do not use event.keycode this is deprecated.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        let current: string = this._el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex[this.numericType])) {
            event.preventDefault();
        }
    }

}