import { Component, OnInit, Input } from '@angular/core';
// import { InviteUserComponent } from './invite-user/invite-user.component';
// import { CategoryEditorComponent } from './category-editor/category-editor.component';
// import { ItemEditorComponent } from './item-editor/item-editor.component';
import { InvoiceService } from '../../services/invoice.service';
import { CustomerSupplierService } from '../../services/customer-supplier.service'
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { CategoryEditorComponent } from './category/category-editor/category-editor.component';
import { ItemEditorComponent } from './item/item-editor/item-editor.component';
import { SupplierEditorComponent } from './supplier/supplier-editor/supplier-editor.component';
import { CustomerEditorComponent } from './customer/customer-editor/customer-editor.component';
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
  supplierList = [];
  selectedCustomerId: number;
  selectedCustomerName: string = '';
  selectedSupplierId: number;
  selectedSupplierName: string = '';
  @Input() on = true;
  customerDebtorList = [];
  totalCreditPayment: number = 0.00;
  totalDebitAmount: number = 0.00;
  totalCreditPaymentOfSupplier: number = 0.00;
  totalDebitAmountOfSupplier: number = 0.00;


  customerSource: LocalDataSource = new LocalDataSource();
  supplierSource: LocalDataSource = new LocalDataSource();
  constructor(private modalService: NgbModal, private invoiceService: InvoiceService, private cusomerSupplierService: CustomerSupplierService) { }

  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
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

      paymentDate: {
        title: 'Payment Date',
        type: 'string',
      },
      paymentType: {
        title: 'Payment Type',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      invoiceId: {
        title: 'Invoice NO',
        type: 'number',
      },
      debitAmount: {
        title: 'Debit Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      creditAmount: {
        title: 'Credit Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      }
    },
  };
  supplierTable = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
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

      paymentDate: {
        title: 'Payment Date',
        type: 'string',
      },
      paymentType: {
        title: 'Payment Type',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      goodReceivedId: {
        title: 'Good Received NO',
        type: 'number',
      },
      debitAmount: {
        title: 'Debit Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      creditAmount: {
        title: 'Credit Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      }
    },
  };

  ngOnInit() {
    this.invoiceService.getCustomerList().then((response) => {
      this.customerList = response.json().result;
    });

    this.invoiceService.getSupplierList().then((response) => {
      this.supplierList = response.json().result;
    })
  }

  addCustomerName(customerId, event) {
    event.target.value = '';
    this.selectedCustomerId = null;
    this.selectedCustomerName = '';
    customerId = Number(customerId);
    if (customerId == -1) {
      this.selectedCustomerName = '';
    } else if (customerId == 0) {
      this.totalCreditPayment = 0;
      this.totalDebitAmount = 0;
      this.customerDebtorList = [];
      this.customerSource.load(this.customerDebtorList);

    } else {
      this.cusomerSupplierService.getCustomerPaymentDetail(customerId).then((responce) => {
        this.totalCreditPayment = 0;
        this.totalDebitAmount = 0;
        this.customerDebtorList = responce.json().result
        console.log("customer payment list", this.customerDebtorList);
        this.customerSource.load(this.customerDebtorList);
        this.customerDebtorList.forEach(debtor => {
          this.totalCreditPayment += debtor.creditAmount;
          this.totalDebitAmount += debtor.debitAmount;
        });
      })


      let selectedCustomer = _.find(this.customerList, { 'customerId': customerId });
      if (selectedCustomer != null) {
        this.selectedCustomerName = selectedCustomer.firstName;
        event.target.value = this.selectedCustomerName;
        this.selectedCustomerId = selectedCustomer.customerId;
      }

    }
  }
  showCategoryAddWindow() {
    this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(CategoryEditorComponent, { size: 'lg', container: 'nb-layout' });
    editorModel.componentInstance.selectedTask = this.data;
  }
  showSubCategoryAddWindow() {
    this.data.category = 'subCategory';
    const editorModel = this.modalService.open(CategoryEditorComponent, { size: 'lg', container: 'nb-layout' });
    editorModel.componentInstance.selectedTask = this.data;
  }
  showItemAddWindow() {
    //this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(ItemEditorComponent, { size: 'lg', container: 'nb-layout' });
    editorModel.componentInstance.selectedTask = this.data;
  }

  addSupplierName(supplierId, event) {

    event.target.value = '';
    this.selectedSupplierId = null;
    this.selectedSupplierName = '';
    supplierId = Number(supplierId);
    if (supplierId == -1) {
      this.selectedSupplierName = '';
    } else if (supplierId == 0) {
      this.selectedSupplierName = '';
      this.customerDebtorList =[];
      this.totalCreditPaymentOfSupplier = 0;
      this.totalDebitAmountOfSupplier = 0;
      this.supplierSource.load(this.customerDebtorList);
    }
    else {

      this.cusomerSupplierService.getSupplierPaymentDetails(supplierId).then((responce) => {
        this.totalCreditPaymentOfSupplier = 0;
        this.totalDebitAmountOfSupplier = 0;
        this.customerDebtorList = responce.json().result
        this.supplierSource.load(this.customerDebtorList);
        this.customerDebtorList.forEach(debtor => {
          this.totalCreditPaymentOfSupplier += debtor.creditAmount;
          this.totalDebitAmountOfSupplier += debtor.debitAmount;
        });
      })


      let selectedSupplier = _.find(this.supplierList, { 'supplierId': supplierId });
      if (selectedSupplier != null) {
        this.selectedSupplierName = selectedSupplier.firstName;
        event.target.value = this.selectedSupplierName;
        this.selectedSupplierId = selectedSupplier.customerId;
      }

    }
  }

  showCustomerEditorWindow() {
    //this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(CustomerEditorComponent, { size: 'lg', container: 'nb-layout' });
    editorModel.componentInstance.selectedTask = this.data;
  }

  showSupplierEditorWindow() {
    //this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(SupplierEditorComponent, { size: 'lg', container: 'nb-layout' });
    editorModel.componentInstance.selectedTask = this.data;
  }

}



