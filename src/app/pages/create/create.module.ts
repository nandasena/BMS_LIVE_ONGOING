import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create.component';
import { CategoryEditorComponent } from './category/category-editor/category-editor.component'
import { CategoryListComponent } from './category/category-list/category-list.component'
import { SubCategoryListComponent } from './category/subCategory-list/subCategory-list.component'
import { ItemEditorComponent } from './item/item-editor/item-editor.component';
import { ItemBtnComponent } from './item/Item-list/item-btn.component';
import { ItemDetailsComponent } from './item/item-detail/item-detail.component';
import { ItemListComponent } from './item/Item-list/Item-list.component';
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
    ],
    providers: [
      SmartTableService
    ]
  })


export class CreateModule { }
