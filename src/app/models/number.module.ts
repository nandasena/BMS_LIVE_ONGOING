
import { NumberOnlyDirective } from './number-directive';
import { NumberDirectiveDiscount } from './number-directive-discount'
import {DoubleNumberDirective} from './double-number-directive';
import { NgModule } from '@angular/core';
import { from } from 'rxjs/observable/from';

@NgModule({
    imports: [
    ],
    exports: [
        NumberOnlyDirective, 
        NumberDirectiveDiscount,
        DoubleNumberDirective
    ],
    declarations: [
        NumberOnlyDirective,
        NumberDirectiveDiscount,
        DoubleNumberDirective
    ],
    entryComponents: [
    ],
})
export class NumberModal { }