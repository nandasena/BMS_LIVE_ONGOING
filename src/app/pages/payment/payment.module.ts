import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import {PaymentComponent} from '../../pages/payment/payment.component';
import {PaymentDetailComponent} from '../../pages/payment/payment-detail-list/payment-detail.component';
import {NumberModal} from '../../models/number.module';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
    NgxSpinnerModule,
    NumberModal
  ],
  declarations: [
    PaymentComponent,
    PaymentDetailComponent,
  ],
  entryComponents: [
  ],
  providers: [
    SmartTableService,
  ]
})
export class PaymentModule { }