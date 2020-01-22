import { SettingsService } from "../../../../services/settings.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertifyService } from "../../../../services/alertify.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

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
      customerid: {
        title: 'Customer Id',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
    },
  };

  data = {
    category: '',
  }
  init_data = [];
  source: LocalDataSource = new LocalDataSource();


  constructor(private service: SettingsService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService ) {}


    ngOnInit() {

  }

  onEdit(event) {}
  Customerdelete(event) {}
}
