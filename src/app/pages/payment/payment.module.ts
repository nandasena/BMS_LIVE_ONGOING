import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import {PaymentComponent} from '../../pages/payment/payment.component';
import {PaymentDetailComponent} from '../../pages/payment/payment-detail-list/payment-detail.component';
import {CreditPaymentDetailButtonComponent} from '../../pages/payment/credit-payment-detail-button.component';
import {CreditPaymentDetailModalWindowComponent} from '../../pages/payment/credi-payment-detail/credit-payment-detail-modal-window.component';
import {ChequeClearStatusComponent} from '../payment/credi-payment-detail/cheque-clear-status.component'
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
    CreditPaymentDetailButtonComponent,
    CreditPaymentDetailModalWindowComponent,
    ChequeClearStatusComponent
  ],
  entryComponents: [
    CreditPaymentDetailButtonComponent,
    CreditPaymentDetailModalWindowComponent,
    ChequeClearStatusComponent
  ],
  providers: [
    SmartTableService,
  ]
})
export class PaymentModule { }