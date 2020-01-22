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
import {PurchaseOrderCreateComponent} from './create-purchase-order/purchase-order-create.component';
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
    PurchaseOrderComponent,
    PurchaseOrderListComponent,
    PurchaseOrderDetailButtonComponent,
    PurchaseOrderDetailComponent,
    PurchaseOrderCreateComponent
  ],
  entryComponents: [
    PurchaseOrderListComponent,
    PurchaseOrderDetailButtonComponent,
    PurchaseOrderDetailComponent,
    PurchaseOrderCreateComponent
  ],
  providers: [
    SmartTableService,
  ]
})
export class PurchaseOrderModal {

 }
