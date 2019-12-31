import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create.component';
@NgModule({
    imports: [
      ThemeModule,
      Ng2SmartTableModule,
      FormsModule,
    ],
    declarations: [
        CreateComponent,
    ],
    entryComponents: [
        CreateComponent,
    ],
    providers: [
      SmartTableService
    ]
  })


export class CreateModule { }