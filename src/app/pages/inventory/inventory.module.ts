import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { InventoryComponent } from './inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventorySummeryComponent } from './inventory-summery/inventory-summery.component';
import { InventoryAssignComponent } from './inventory-assign/inventory-assign.component';
import { InventoryIssueBtnComponent } from './inventory-list/inventory-issue-btn-component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    InventoryComponent,
    InventoryListComponent,
    InventoryAddComponent,
    InventorySummeryComponent,
    InventoryAssignComponent,
    InventoryIssueBtnComponent
  ],
  entryComponents: [
    InventoryListComponent,
    InventoryAddComponent,
    InventorySummeryComponent,
    InventoryAssignComponent,
    InventoryIssueBtnComponent
  ],
  providers: [
    SmartTableService
  ]
})

export class InventoryModule { }
