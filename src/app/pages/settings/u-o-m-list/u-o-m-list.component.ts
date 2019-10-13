import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'u-o-m-list',
  templateUrl: './u-o-m-list.component.html',
  styleUrls: ['./u-o-m-list.component.scss']
})
export class UOMListComponent implements OnInit {

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
      name: {
        title: 'Name',
        type: 'string',
      },
      count: {
        title: 'Count',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private modalService: NgbModal) {
    const data = this.service.getUOMList();
    this.source.load(data);
  }

  ngOnInit() {
  }

}
