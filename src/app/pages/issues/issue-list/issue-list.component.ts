import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AssignIssueBtnComponent } from './assign-issue-btn-component';

@Component({
  selector: 'issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    
    columns: {
      id: {
        title: 'Identifier Code',
        type: 'number',
      },
      issue: {
        title: 'Issue',
        type: 'string',
      },
      reportedBy: {
        title: 'Reported By',
        type: 'string',
      },
      priority: {
        title: 'Priority',
        type: 'string',
      },
      // reportedDate: {
      //   title: 'Reported Date',
      //   type: 'string',
      // },
      // type: {
      //   title: 'Type',
      //   type: 'string',
      // },
      completedDate: {
        title: 'Completed Date',
        type: 'string',
      },
      helpingPerson: {
        title: 'Helping Person',
        type: 'string',
      },
      button: {
        title: '',
        type: 'custom',
        renderComponent: AssignIssueBtnComponent
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private modalService: NgbModal) {
    const data = this.service.getIssueList();
    this.source.load(data);
  }

  ngOnInit() {
  }

}
