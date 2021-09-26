import { Component, OnInit } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { IMyDpOptions } from 'mydatepicker';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../../services/alertify.service';
import { QuotationService } from '../../../services/quotation.service';
import * as moment from 'moment';
import { InvoiceEditComponent } from '../../invoice/invoice-edit/invoice-edit.component';
import { InvoiceQuotationPrintComponent } from './invoice-quotation-print.component';
@Component({
  selector: 'invoice-quitation-list',
  templateUrl: './invoice-quitation-list.component.html',
  styleUrls: ['./invoice-quitation-list.component.scss']
})
export class InvoiceQuitationListComponent implements OnInit {

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
      customerName: {
        title: 'Customer Name',
        type: 'string',
      },
      paymentType: {
        title: 'Payment Type',
        type: 'string',
      },
      totalAmount: {
        title: 'Total Amount',
        type:'html',
        valuePrepareFunction: (value) => { return '<p class="cell_left">' + (value === 'Total' ? value :Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)) + '</p>' }
       
      },
      invoiceDiscount: {
        title: 'Invoice Discount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      print: {
        title:'',
        type: 'custom',
        renderComponent:InvoiceQuotationPrintComponent
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

  constructor(private service: SmartTableService, private modalService: NgbModal, private quotationService: QuotationService, private alertify: AlertifyService) { 

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
    today.setDate(today.getDate() + 1);

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let y = today.getFullYear();
    let someFormattedDateToDate = y + '-' + mm + '-' + dd;

    this.quotationService.getQuotationByDateRange(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
      let retunData = response.json();
      if (retunData.statusCode == 200) {
        this.source.load(retunData.result);
      }
    });
  }

  ngOnInit() {
  }
  getInvoiceByDate(){
    if (this.toDate!=null && this.fromDate!=null) {
      let today = new Date(this.toDate.formatted);
      today.setDate(today.getDate() + 1);

      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let y = today.getFullYear();

      let someFormattedDateToDate = y + '-' + mm + '-' + dd;
      this.quotationService.getQuotationByDateRange(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
        let retunData = response.json();
        if (retunData.statusCode == 200) {
          this.source.load(retunData.result);
        }
      });
    }else{
      this.alertify.error('Please select date...');
    }
  }

  showDetails(event): void {
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

    const activeEditModal = this.modalService.open(InvoiceEditComponent,options);
    activeEditModal.componentInstance.invoiceId = id;
    activeEditModal.componentInstance.invoiceNumber = invoiceNumber;
    activeEditModal.componentInstance.type = 'quotation';

  }

}
