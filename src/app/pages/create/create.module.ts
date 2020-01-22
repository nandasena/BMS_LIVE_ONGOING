import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create.component';
import { from } from 'rxjs/observable/from';

import { CategoryEditorComponent } from './category/category-editor/category-editor.component'
import { CategoryListComponent } from './category/category-list/category-list.component'
import { SubCategoryListComponent } from './category/subCategory-list/subCategory-list.component'
import { ItemEditorComponent } from './item/item-editor/item-editor.component';
import { ItemBtnComponent } from './item/Item-list/item-btn.component';
import { ItemDetailsComponent } from './item/item-detail/item-detail.component';
import { ItemListComponent } from './item/Item-list/Item-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { SupplierEditorComponent } from './supplier/supplier-editor/supplier-editor.component';
import { CustomerEditorComponent } from './customer/customer-editor/customer-editor.component';

@NgModule({
    imports: [
      ThemeModule,
      Ng2SmartTableModule,
      FormsModule,
    ],
    declarations: [
        CreateComponent,
        CategoryEditorComponent,
        CategoryListComponent,
        SubCategoryListComponent,
        ItemEditorComponent,
        ItemBtnComponent,
        ItemDetailsComponent,
        ItemListComponent,
        CustomerListComponent,
        SupplierListComponent,
        SupplierEditorComponent,
    ],
    entryComponents: [
        CreateComponent,
        CategoryEditorComponent,
        CategoryListComponent,
        SubCategoryListComponent,
        ItemEditorComponent,
        ItemBtnComponent,
        ItemDetailsComponent,
        ItemListComponent,
        CustomerListComponent,
        SupplierListComponent,
        SupplierEditorComponent,
    ],
    providers: [
      SmartTableService
    ]
  })


export class CreateModule { }
