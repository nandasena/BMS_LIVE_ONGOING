import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TargetOverallComponent } from './target-overall.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    TargetOverallComponent,
  ]
})
export class TargetOverallModule { } 
