import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'business-selfie-list',
  templateUrl: './business-selfie-list.component.html',
  styleUrls: ['./business-selfie-list.component.scss']
})
export class BusinessSelfieListComponent implements OnInit {
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: false,
    },
    
    columns: {
      id: {
        title: 'Week',
        type: 'string',
      },
      name: {
        title: 'Rating',
        type: 'number',
      },
      comment: {
        title: 'Comments',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private modalService: NgbModal) {
    const data = this.service.getbusinessSelfieList();
    this.source.load(data);
  }
  ngOnInit() {
  }

}
