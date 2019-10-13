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
import { NumberOnlyDirective } from '../../models/number-directive'
import { NgxSpinnerModule } from 'ngx-spinner';
import {NumberDirectiveDiscount} from '../../models/number-directive-discount'
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
    InvoiceComponent,
    InvoiceListComponent,
    InvoiceAddComponent,
    InvoiceEditComponent,
    CustomRenderComponent,
    InvoiceExpandComponent,
    NumberOnlyDirective,
    NumberDirectiveDiscount
  ],
  entryComponents: [
    InvoiceAddComponent,
    InvoiceEditComponent,
    CustomRenderComponent,
    InvoiceExpandComponent
  ],
  providers: [
    SmartTableService,
    // Config,
    // CommonService

  ]
})
export class InvoiceModule { }
