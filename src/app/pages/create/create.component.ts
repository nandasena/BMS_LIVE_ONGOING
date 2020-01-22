import { Component, OnInit, Input } from '@angular/core';
// import { InviteUserComponent } from './invite-user/invite-user.component';
// import { CategoryEditorComponent } from './category-editor/category-editor.component';
// import { ItemEditorComponent } from './item-editor/item-editor.component';
import { InvoiceService } from '../../services/invoice.service';
import { CusomerSupplierService } from '../../services/customer-supplier.service'
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { CategoryEditorComponent } from './category/category-editor/category-editor.component';
import { ItemEditorComponent } from './item/item-editor/item-editor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { CustomerListComponent } from './customer/customer-list/customer-list.component';

@Component({
  selector: 'settings',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  data = {
    category: '',
  }
  customerList = [];
  selectedCustomerId: number;
  selectedCustomerName: string = '';
  @Input() on = true;
  source: LocalDataSource = new LocalDataSource();
  constructor(private modalService: NgbModal, private invoiceService: InvoiceService, private cusomerSupplierService: CusomerSupplierService) { }

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
      editButtonContent: '<i class="fa fa-arrows-alt"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 15
    },

    columns: {
      invoiceNumber: {
        title: 'Invoice NO',
        type: 'number',
      },
      invoiceDateOfString: {
        title: 'Invoice Date',
        type: 'string',
      },
      paymentType: {
        title: 'Payment Type',
        type: 'string',
      },
      customerName: {
        title: 'Customer Name',
        type: 'string',
      },
      totalAmount: {
        title: 'Total Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      invoiceDiscount: {
        title: 'Invoice Discount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      }
    },
  };

  ngOnInit() {
    this.invoiceService.getCustomerList().then((response) => {
      this.customerList = response.json().result;
      console.log("this.customerList=====", this.customerList);
    })
  }

  addCustomerName(customerId, event) {
    event.target.value = '';
    this.selectedCustomerId = null;
    this.selectedCustomerName = '';
    customerId = Number(customerId);
    if (customerId == -1) {
      this.selectedCustomerName = '';
    } else {

      this.cusomerSupplierService.getCustomerPaymentDetail(customerId).then((responce) => {

        console.log("customer payment list", responce.json().result);
        this.source.load(responce.json().result);
      })


      let selectedCustomer = _.find(this.customerList, { 'customerId': customerId });
      if (selectedCustomer != null) {
        this.selectedCustomerName = selectedCustomer.firstName;
        event.target.value = this.selectedCustomerName;
        this.selectedCustomerId = selectedCustomer.customerId;
      }

    }
  }
  showCategoryEditorWindow() {
    this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(CategoryEditorComponent, {size:'lg', container: 'nb-layout'});
    editorModel.componentInstance.selectedTask = this.data;
  }
  showSubCategoryEditorWindow() {
    this.data.category = 'subCategory';
   const editorModel = this.modalService.open(CategoryEditorComponent, {size:'lg', container: 'nb-layout'});
   editorModel.componentInstance.selectedTask = this.data;
  }
  showItemEditorWindow() {
    //this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(ItemEditorComponent, {size:'lg', container: 'nb-layout'});
    editorModel.componentInstance.selectedTask = this.data;
  }

  showCustomerEditorWindow() {
    //this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(ItemEditorComponent, {size:'lg', container: 'nb-layout'});
    editorModel.componentInstance.selectedTask = this.data;
  }

  showSupplierEditorWindow() {
    //this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(ItemEditorComponent, {size:'lg', container: 'nb-layout'});
    editorModel.componentInstance.selectedTask = this.data;
  }

}



