import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceAddComponent } from './invoice/invoice-add/invoice-add.component';
import { InventoryComponent } from './inventory/inventory.component';
import {PaymentComponent}from './payment/payment.component';
import {PurchaseOrderComponent} from './purchase-order/purchase-order.component';
import { PurchaseOrderCreateComponent} from './purchase-order/create-purchase-order/purchase-order-create.component';
import { GoodReceived} from './purchase-order/good-received/good-received.component'
import { SettingsComponent } from './settings/settings.component';
import { BusinessSelfieComponent } from './business-selfie/business-selfie.component';
import { TeamComponent } from './dashboard/team/team.component';
import { CreateComponent } from './create/create.component';
import {PaymentHandleComponent} from './payment-handle/payment-handle.component';
import {ChequeComponent} from './payment-handle/cheque/cheque.component';
import {ReportComponent} from './report/report.component';
import {ProfitOnInvoiceComponent} from './report/profit-on-invoice/profit-on-invoice.component';
import {ItemWiseProfitComponent}from './report/item-wise-profit/item-wise-profit.component';
import {JobComponent} from './job/job.component';
import {CreateJobComponent} from './job/create-job/create-job.component';
import {EditJodComponent}from './job/edit-jod/edit-jod.component';
import {ViewJobComponent} from './job/view-job/view-job.component';
import {InvoiceQuotationComponent}from './quotation/invoice-quotation/invoice-quotation.component';
import {JobQuotationComponent} from './quotation/job-quotation/job-quotation.component';
import {QuotationComponent} from './quotation/quotation.component';
import { from } from 'rxjs/observable/from';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'invoice-add',
    component: InvoiceAddComponent,
  },
  {
    path: 'business-selfie',
    component: BusinessSelfieComponent,
  },
  {
    path:'payment',
    component:PaymentComponent,
  },
  {
    path:'purchase-order',
    component:PurchaseOrderComponent,
  },
  {
    path:'create-purchase-order',
    component: PurchaseOrderCreateComponent,
  },
  {
    path:'good-received',
    component: GoodReceived,
  },
  
  {
    path:'create',
    component:CreateComponent,
  },
  {
    path:'payment-handle',
    component:PaymentHandleComponent,
  },
  {
    path:'report',
    component:ReportComponent,
  },
  {
    path:'profit-on-invoice',
    component:ProfitOnInvoiceComponent,
  },
  {
    path:'item-wise-profit',
    component:ItemWiseProfitComponent,
  },
  {
    path:'cheque-handle',
    component:ChequeComponent,
  },
  {
    path:'job-handle',
    component:JobComponent,
  },
  {
    path:'job-create',
    component:CreateJobComponent,
  },
  {
    path:'job-edit',
    component:EditJodComponent,
  },
  {
    path:'job-view',
    component:ViewJobComponent,
  },
  {
    path:'invoice-quotation',
    component:InvoiceQuotationComponent,
  },
  {
    path:'job-quotation',
    component:JobQuotationComponent,
  },
  {
    path:'quotation',
    component:QuotationComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
