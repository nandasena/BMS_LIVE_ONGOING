import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { SettingsComponent } from './settings.component';
import { UOMListComponent } from './u-o-m-list/u-o-m-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

import { RockTypeListComponent } from './rock-type-list/rock-type-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { InviteRenderButtonComponent } from './user-list/invite-render-button.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import{  FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
  ],
  declarations: [
    SettingsComponent,
    UOMListComponent,
    RockTypeListComponent,
    UserListComponent,
    InviteRenderButtonComponent,
    InviteUserComponent,
    CategoryListComponent,
  ],
  entryComponents: [
    UOMListComponent,
    RockTypeListComponent,
    UserListComponent,
    InviteRenderButtonComponent,
    InviteUserComponent,
    CategoryListComponent,
  ],
  providers: [
    SmartTableService
  ]
})

export class SettingsModule { }
