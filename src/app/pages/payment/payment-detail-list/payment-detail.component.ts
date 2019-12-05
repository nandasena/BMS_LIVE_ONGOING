import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { CustomRenderComponent } from './custome-render.component';
import { InvoiceService } from '../../../services/invoice.service';
import { AlertifyService } from '../../../services/alertify.service';
import { PaymentModal } from '../../../models/payment-modal';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'payment-detail-list',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})


export class PaymentDetailComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  fromDate;
  toDate;
  model = { date: {}, formatted: '' };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  creditList = [];
  modalReference: NgbModalRef;
  showChequeFild: boolean = false;
  showCardFild: boolean = false;
  isShowCashFild: boolean = true;
  chequeNo: string = '';
  carsRefNo: string = '';
  paymentType = '';
  paymentDetailList: PaymentModal[] = [];
  paymentDetail;
  isCheckedCash: boolean = true;
  isCheckedCheque: boolean = false;
  isCheckedCreditCard: boolean = false;
  isCheckedDebitCard: boolean = false;
  isCheckedCredit: boolean = false;
  invoiceAmount: number = 0.00;
  totalPayment: number = 0.00;
  balance:number=0.00;
  fildName='';

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
      editButtonContent: '<i class="fa fa-paypal"></i>',
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
      customerName: {
        title: 'Customer Name',
        type: 'string',
      },
      amount: {
        title: 'Invoice Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      paidAmount: {
        title: 'Payment',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      invoiceDateOfString: {
        title: 'Invoice Date',
        type: 'string',
      },
    },
  };


  constructor(private service: SmartTableService, private modalService: NgbModal, private invoiceService: InvoiceService, private alertify: AlertifyService) {

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
    let toDate = y + '-' + mm + '-' + dd;
    this.invoiceService.getInvoiceCreditList(this.fromDate.formatted, toDate, 'LN').then((response) => {
      let retunData = response.json();
      this.creditList = retunData.result;
      this.invoiceService.loadEditCreditList(this.creditList);

    });
  }
  ngOnInit() {
    this.invoiceService.getCreditList().subscribe(creditList => {
      this.source.load(creditList);
    });

    this.selectPaymentType('CH')

  }

  getInvoiceByDate() {
    if (this.toDate != null && this.fromDate != null) {
      let today = new Date(this.toDate.formatted);
      today.setDate(today.getDate() + 1);

      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let y = today.getFullYear();

      let toDate = y + '-' + mm + '-' + dd;
      this.invoiceService.getInvoiceCreditList(this.fromDate.formatted, toDate, 'LN').then((response) => {
        let retunData = response.json();
        if (retunData.statusCode == 200) {
          this.invoiceService.loadEditCreditList(retunData.result);
        }
      });
    } else {
      this.alertify.error('Please select date...');
    }
  }

  openModalWindow(content, selectedRow) {
    console.log("selected row", selectedRow)
    this.invoiceAmount = selectedRow.amount;
    this.totalPayment = selectedRow.paidAmount;
    this.isCheckedCash = true;
    this.isCheckedCheque = false;
    this.isCheckedCreditCard = false;
    this.isCheckedDebitCard = false;
    this.isCheckedCredit = false;
    this.showChequeFild = false;
    this.showCardFild = false;
    this.chequeNo = '';
    this.carsRefNo = '';
    this.isShowCashFild = true;
    this.modalReference = this.modalService.open(content, { size: 'lg' });
  }

  closeModalWindow() {
    this.isShowCashFild = true;
    this.modalReference.close();
  }
  selectPaymentType(values) {
    this.showChequeFild = false;
    this.showCardFild = false;
    this.paymentType = values;
    this.paymentDetail = new PaymentModal();
    this.paymentDetail.typeCode = this.paymentType;
    if (this.paymentType == 'LN') {
      this.isShowCashFild = false;
      this.chequeNo = '';
      this.carsRefNo = '';
    }
    if (this.paymentType == 'CQ') {
      this.showChequeFild = true;
      this.isShowCashFild = true;
      this.carsRefNo = '';
      this.fildName='Amount';
    }
    if (this.paymentType == 'CD') {
      this.showCardFild = true;
      this.isShowCashFild = true;
      this.chequeNo = '';
      this.fildName='Amount';

    }
    if (this.paymentType == 'CH') {
      this.chequeNo = '';
      this.carsRefNo = '';
      this.isShowCashFild = true;
      this.fildName='Cash';
    }
    if (this.paymentType == 'DB') {
      this.showCardFild = true;
      this.isShowCashFild = true;
      this.chequeNo = '';
      this.fildName='Amount';
    }
  }

  saveCreditInvoice() {

    if (this.balance > 0) {
      this.alertify.error('Balance amount more than total amount ....');
      return false;
    }

    if (this.showChequeFild) {
      if (this.chequeNo == '') {
        this.alertify.error('Please add cheque number....');
        return false;
      }
    }
    if (this.showCardFild) {
      if (this.carsRefNo == "") {
        this.alertify.error('Please add ref number....');
        return false;
      }

    }

  }

  getBalanceAmount(){

  }
}
