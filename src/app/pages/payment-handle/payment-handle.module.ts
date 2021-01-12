import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { PagesRoutingModule } from '../pages-routing.module';
import {NumberModal} from '../../models/number.module';
import {PaymentHandleComponent} from './payment-handle.component';
import { ChequeComponent } from './cheque/cheque.component';
import { from } from 'rxjs/observable/from';

@NgModule({
    imports: [
      ThemeModule,
      Ng2SmartTableModule,
      FormsModule,
      MyDatePickerModule,
      NumberModal,
      PagesRoutingModule
    ],
    declarations: [
      ChequeComponent
  ],
    entryComponents: [
      ChequeComponent
    ],
    providers: [
      SmartTableService
    ]
  })


export class PaymentHandleModule { }