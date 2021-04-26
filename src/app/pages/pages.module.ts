import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { InventoryModule } from './inventory/inventory.module';
import { SettingsModule } from './settings/settings.module';
import { BusinessSelfieModule } from './business-selfie/business-selfie.module';
import {PaymentModule}from './payment/payment.module';
import {PurchaseOrderModal} from './purchase-order/purchase-order.module';
import { CreateModule } from './create/create.module';
import { PaymentHandleComponent } from './payment-handle/payment-handle.component';
import {PaymentHandleModule} from './payment-handle/payment-handle.module';
import { ReportComponent } from './report/report.component';
import { ProfitOnInvoiceComponent } from './report/profit-on-invoice/profit-on-invoice.component';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StyleDirective } from './style.directive';
import { ItemWiseProfitComponent } from './report/item-wise-profit/item-wise-profit.component';
import { JobComponent } from './job/job.component';
import { CreateJobComponent } from './job/create-job/create-job.component';
import { EditJodComponent } from './job/edit-jod/edit-jod.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NumberModal} from '../models/number.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    InvoiceModule,
    InventoryModule,
    SettingsModule,
    BusinessSelfieModule,
    PaymentModule,
    PurchaseOrderModal,
    CreateModule,
    PaymentHandleModule,
    MyDatePickerModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NumberModal
  ],
  declarations: [
    ...PAGES_COMPONENTS,
     PaymentHandleComponent,
     ReportComponent,
     ProfitOnInvoiceComponent,
     StyleDirective,
     ItemWiseProfitComponent,
     JobComponent,
     CreateJobComponent,
     EditJodComponent
  ],
  providers: [
    // Config,
    // CommonService
  ]
})
export class PagesModule {
}
