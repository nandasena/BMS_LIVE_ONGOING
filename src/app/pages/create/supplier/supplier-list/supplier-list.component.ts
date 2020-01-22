import { SettingsService } from "../../../../services/settings.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertifyService } from "../../../../services/alertify.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

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
      supplierId: {
        title: 'Supplier Id',
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
  supplierdelete(event) {}
}
