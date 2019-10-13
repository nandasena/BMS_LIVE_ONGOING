import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { IssuesComponent } from './issues.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueAddComponent } from './issue-add/issue-add.component';
import { IssueSummeryComponent } from './issue-summery/issue-summery.component';
import { IssueAssignComponent } from './issue-assign/issue-assign.component';
import { AssignIssueBtnComponent } from './issue-list/assign-issue-btn-component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    IssuesComponent,
    IssueListComponent,
    IssueAddComponent,
    IssueSummeryComponent,
    IssueAssignComponent,
    AssignIssueBtnComponent
  ],
  entryComponents: [
    IssueListComponent,
    IssueAddComponent,
    IssueSummeryComponent,
    IssueAssignComponent,
    AssignIssueBtnComponent
  ],
  providers: [
    SmartTableService
  ]
})

export class IssuesModule { }