import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'rock-type-list',
  templateUrl: './rock-type-list.component.html',
  styleUrls: ['./rock-type-list.component.scss']
})
export class RockTypeListComponent implements OnInit {

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
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private modalService: NgbModal) {
    const data = this.service.getRockTypeList();
    this.source.load(data);
  }

  ngOnInit() {
  }

}
