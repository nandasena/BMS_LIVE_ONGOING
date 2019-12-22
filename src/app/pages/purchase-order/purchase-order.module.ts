import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { PurchaseOrderComponent } from './purchase-order.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';

import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import {PurchaseOrderListComponent} from './purchase-order-list/purchase-order-list.component';
import {PurchaseOrderDetailButtonComponent} from './purchase-order-detail-button.component';
import {PurchaseOrderDetailComponent}from './purchase-order-detail-modal-window/purchase-order-detail-modal-window.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
    NgxSpinnerModule,
  ],
  declarations: [
    PurchaseOrderComponent,
    PurchaseOrderListComponent,
    PurchaseOrderDetailButtonComponent,
    PurchaseOrderDetailComponent
  ],
  entryComponents: [
    PurchaseOrderListComponent,
    PurchaseOrderDetailButtonComponent,
    PurchaseOrderDetailComponent
  ],
  providers: [
    SmartTableService,
  ]
})
export class PurchaseOrderModal {

 }
