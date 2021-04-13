import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../../services/alertify.service';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import {ReportService} from '../../../services/report.service'

@Component({
  selector: 'profit-on-invoice',
  templateUrl: './profit-on-invoice.component.html',
  styleUrls: ['./profit-on-invoice.component.scss']
})
export class ProfitOnInvoiceComponent implements OnInit {

  invoiceDetailsList;

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
      invoiceDate: {
        title: 'Invoice Date',
        type: 'string',
      },
      totalAmount: {
        title: 'Total Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      totalCost: {
        title: 'Total Cost',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      profitOrLost: {
        title: 'Profit Or Lost',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      invoiceDiscount: {
        title: 'Invoice Discount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
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

  constructor(private reportService:ReportService,private alertify: AlertifyService) { 
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

    this.reportService.getInvoiceDetailsByDateRange(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
      let retunData = response.json();
      if (retunData.statusCode == 200) {
        this.invoiceDetailsList =retunData.result;
        this.source.load(this.invoiceDetailsList);
      }
    });
  }
  ngOnInit() {
  }

  getInvoiceDetailsByDate(){
    if (this.toDate!=null && this.fromDate!=null) {
      let today = new Date(this.toDate.formatted);
      today.setDate(today.getDate() + 1);

      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let y = today.getFullYear();

      let someFormattedDateToDate = y + '-' + mm + '-' + dd;
      this.reportService.getInvoiceDetailsByDateRange(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
        let retunData = response.json();
        if (retunData.statusCode == 200) {
          this.invoiceDetailsList =retunData.result;
          this.source.load(this.invoiceDetailsList);
        }
      });
    }else{
      this.alertify.error('Please select date...');
    }
  }

}
