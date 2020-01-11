import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { AlertifyService } from '../../../services/alertify.service';
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { SmartTableService } from "../../../@core/data/smart-table.service";
import { SettingsService } from "../../../services/settings.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})

export class ItemDetailsComponent implements OnInit {

  @Input() rowData

  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: "right"
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
  constructor(
    private service: SmartTableService,
    private modalService: NgbModal ,
    private alertifyService: AlertifyService,
    private activeModal: NgbActiveModal,
    private settingsservice: SettingsService
  ) {}

  ngOnInit() {}

  closeModal() {
    //this.temp_itemcount = 0;
  }
}
