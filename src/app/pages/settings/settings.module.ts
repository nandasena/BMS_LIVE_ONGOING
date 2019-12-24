import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { SettingsComponent } from './settings.component';
import { ItemListComponent } from './Item-list/Item-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

import { RockTypeListComponent } from './rock-type-list/rock-type-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { InviteRenderButtonComponent } from './user-list/invite-render-button.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { FormsModule } from '@angular/forms';
import { SubCategoryListComponent } from './subCategory-list/subCategory-list.component';
import { ItemEditorComponent } from './item-editor/item-editor.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
  ],
  declarations: [
    SettingsComponent,
    ItemListComponent,
    RockTypeListComponent,
    UserListComponent,
    InviteRenderButtonComponent,
    InviteUserComponent,
    CategoryListComponent,
    CategoryEditorComponent,
    SubCategoryListComponent,
    ItemEditorComponent,
  ],
  entryComponents: [
    ItemListComponent,
    RockTypeListComponent,
    UserListComponent,
    InviteRenderButtonComponent,
    InviteUserComponent,
    CategoryListComponent,
    CategoryEditorComponent,
    SubCategoryListComponent,
    ItemEditorComponent,
  ],
  providers: [
    SmartTableService
  ]
})

export class SettingsModule { }
