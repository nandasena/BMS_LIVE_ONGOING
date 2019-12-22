import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
import { PurchaseOrderService } from '../../../services/purchaseOrder.service';
import { AlertifyService } from '../../../services/alertify.service';
import {PurchaseOrderDetailButtonComponent}from '../purchase-order-detail-button.component';

@Component({
  selector: 'purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
    purchaseOrderList=[];

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
      pager: {
        display: true,
        perPage: 15
      },
  
      columns: {
        purchaseCode: {
          title: 'Purchase Order NO',
          type: 'number',
        },
        estimationDate: {
          title: 'Receive Date',
          type: 'string',
        },
        supplierName: {
          title: 'Supplier Name',
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
        },
        print: {
          title:'',
          type: 'custom',
          renderComponent:PurchaseOrderDetailButtonComponent
        },
      },
    };
  
    source: LocalDataSource = new LocalDataSource();
    fromDate;
    toDate;
    model = { date: {}, formatted: '' };
    myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'yyyy-mm-dd',
    };
  
    constructor(private service: SmartTableService, private modalService: NgbModal, private purchaseOrderService: PurchaseOrderService, private alertify: AlertifyService) {
  
      let tempDate = moment().subtract(21, 'days').calendar().split('/');
      this.fromDate = {
        "date": {
          year: tempDate[2],
          month: parseInt(tempDate[0]),
          day: parseInt(tempDate[1])
        },
        formatted: tempDate[2] + '-' + parseInt(tempDate[0]) + '-' + parseInt(tempDate[1])
      }
  
      this.toDate = {
        "date": {
          year: moment().year(),
          month: moment().month() + 1,
          day: moment().date()
        },
        formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
      }
  
      let today = new Date(this.toDate.formatted);
      today.setDate(today.getDate());
  
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let y = today.getFullYear();
      let someFormattedDateToDate = y + '-' + mm + '-' + dd;
      this.purchaseOrderService.getAllPurchaseOrderByDate(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
        let retunData = response.json();
        if (retunData.statusCode == 200) {
          this.purchaseOrderList = retunData.result;
          this.purchaseOrderService.loadPurchaseOrderList(this.purchaseOrderList);
        }
      });
    }
  
    ngOnInit() {
  
      this.purchaseOrderService.getCreditList().subscribe(invoiceList => {
        this.source.load(invoiceList);
      })
    }
  
    onEdit(event): void {
      this.showEditModal(event.data.id, event.data.invoiceNumber);
    }
  
    onDelete(event): void {
      this.alertify.success('Confirm Message');
    }
  
    showEditModal(id, invoiceNumber) {
  
      let options: any = {
        size: "lg modal-dialog my-modal",
        container: 'nb-layout',
        class: "xxx",
        style: 'padding: 117px'
      };
    }
  
    getInvoiceByDate() {
  
      if (this.toDate!=null && this.fromDate!=null) {
        let today = new Date(this.toDate.formatted);
        today.setDate(today.getDate());
  
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let y = today.getFullYear();
  
        let someFormattedDateToDate = y + '-' + mm + '-' + dd;
        this.purchaseOrderService.getAllPurchaseOrderByDate(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
          let retunData = response.json();
          if (retunData.statusCode == 200) {
            this.purchaseOrderList = retunData.result;
            this.purchaseOrderService.loadPurchaseOrderList(this.purchaseOrderList);
          }
        });
      }else{
        this.alertify.error('Please select date...');
      }
  
  
    }
}
