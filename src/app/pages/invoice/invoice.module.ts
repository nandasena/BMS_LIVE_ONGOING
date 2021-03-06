import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { InvoiceComponent } from './invoice.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { CustomRenderComponent } from './invoice-list/custome-render.component';
import { InvoiceExpandComponent } from './invoice-expand/invoice-expand.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NumberOnlyDirective } from '../../models/number-directive';
import {NumberDirectiveDiscount} from '../../models/number-directive-discount'
import {InvoicePrintComponent} from '../invoice/invoice-list/invoice-print.component';
import {NumberModal} from '../../models/number.module';
import { from } from 'rxjs/observable/from';
// import {Config}from '../../config/config.service';
// import {CommonService} from '../../commonService/common.service';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
    NgxSpinnerModule,
    NumberModal
  ],
  declarations: [
    InvoiceComponent,
    InvoiceListComponent,
    InvoiceAddComponent,
    InvoiceEditComponent,
    CustomRenderComponent,
    InvoiceExpandComponent,
    InvoicePrintComponent
  ],
  entryComponents: [
    InvoiceAddComponent,
    InvoiceEditComponent,
    CustomRenderComponent,
    InvoiceExpandComponent,
    InvoicePrintComponent
  ],
  providers: [
    SmartTableService,
    // Config,
    // CommonService

  ]
})
export class InvoiceModule { }
