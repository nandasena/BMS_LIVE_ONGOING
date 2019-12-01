import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceAddComponent } from './invoice/invoice-add/invoice-add.component';
import { InventoryComponent } from './inventory/inventory.component';
import {PaymentComponent}from './payment/payment.component';
import { SettingsComponent } from './settings/settings.component';
import { BusinessSelfieComponent } from './business-selfie/business-selfie.component';
import { TeamComponent } from './dashboard/team/team.component';

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
