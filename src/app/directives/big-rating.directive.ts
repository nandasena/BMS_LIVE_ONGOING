import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[bigRatingHighlight]'
})
export class BigRatingDirective {

  private lastHighlight: number;

  @Input('bigRatingHighlight') highlightedBox: number;

  constructor(private elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    this.rateOne(this.highlightedBox);
  }

  private rateOne(highlightBox: number): void {
    this.lastHighlight = highlightBox;
    console.log('LAST===', this.lastHighlight);

    if (true) {

    }

    this.elementRef.nativeElement.style.backgroundColor = '#dfe3ea';
  }
}
