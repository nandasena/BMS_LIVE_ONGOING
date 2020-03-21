import { SettingsService } from "../../../../services/settings.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertifyService } from "../../../../services/alertify.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";
import { CustomerSupplierService } from '../../../../services/customer-supplier.service'

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
      firstName: {
        title: 'Name',
        type: 'string',
      },
      contactNumber: {
        title: 'Contact No',
        type: 'string',
      },
    },
  };

  data = {
    category: '',
  }
  init_data = [];
  source: LocalDataSource = new LocalDataSource();


  constructor(private service: CustomerSupplierService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService ) {}


    ngOnInit() {
      /// ----------Data Populate To Smart Table

      this.service.getSupplierList().then((response) => {
        this.init_data = response.json().result;
        this.source.load(this.init_data);
      }).catch((ex) => {
        this.init_data;
      });
  }

  onEdit(event) {}
  supplierdelete(event) {}
}
