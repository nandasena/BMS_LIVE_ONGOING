import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import {NumberModal} from '../../models/number.module';

@NgModule({
    imports: [
      ThemeModule,
      Ng2SmartTableModule,
      FormsModule,
      MyDatePickerModule,
      NumberModal
    ],
    declarations: [
    
    ],
    entryComponents: [
 
    ],
    providers: [
      SmartTableService
    ]
  })


export class PaymentHandleModule { }