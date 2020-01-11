import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create.component';
import {CustomerPaymentComponent} from './payment/customer-payment/customer-payment.component'
import { from } from 'rxjs/observable/from';
@NgModule({
    imports: [
      ThemeModule,
      Ng2SmartTableModule,
      FormsModule,
    ],
    declarations: [
        CreateComponent,
        CustomerPaymentComponent
    ],
    entryComponents: [
        CreateComponent,
        CustomerPaymentComponent
    ],
    providers: [
      SmartTableService
    ]
  })


export class CreateModule { }