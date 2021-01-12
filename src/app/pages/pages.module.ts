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
    PaymentHandleModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
     PaymentHandleComponent,
  ],
})
export class PagesModule {
}
