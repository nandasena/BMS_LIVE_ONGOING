import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import {PaymentComponent} from '../../pages/payment/payment.component'
import {PaymentDetailComponent} from '../../pages/payment/payment-detail-list/payment-detail.component'
import { from } from 'rxjs/observable/from';
// import {Config}from '../../config/config.service';
// import {CommonService} from '../../commonService/common.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
    NgxSpinnerModule
  ],
  declarations: [
    // NumberOnlyDirective,
    // NumberDirectiveDiscount,
    PaymentComponent,
    PaymentDetailComponent

  ],
  entryComponents: [
  ],
  providers: [
    SmartTableService,
    // Config,
    // CommonService

  ]
})
export class PaymentModule { }