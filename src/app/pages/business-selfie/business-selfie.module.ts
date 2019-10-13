import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BusinessSelfieComponent } from './business-selfie.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BusinessSelfieListComponent } from './business-selfie-list/business-selfie-list.component';
import { BigRatingDirective } from '../../directives/big-rating.directive';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule
  ],
  declarations: [BusinessSelfieComponent, BusinessSelfieListComponent, BigRatingDirective]
})
export class BusinessSelfieModule { }
