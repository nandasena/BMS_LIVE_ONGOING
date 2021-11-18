import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { AlertifyService } from '../../../services/alertify.service';
import { InvoiceService } from '../../../services/invoice.service';
import * as _ from 'lodash';
import { InvoiceModel } from '../../../models/invoice-modal';

@Component({
  selector: 'credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.scss']
})
export class CreditNoteComponent implements OnInit {
  selectedItemList = [];
  receivedItemList = [];
  invoiceNumber: number = 0;
  InvoiceList=[];
  fromDate;
  toDate;
  returnDate;
  returnDescription: string = "";
  model = { date: {}, formatted: '' };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
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

    this.returnDate = {
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
    this.invoiceService.getInvoiceByDateRange(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
      let retunData = response.json();
      if (retunData.statusCode == 200) {
        this.InvoiceList = retunData.result;
        console.log("Invoice ====", this.InvoiceList);
      }
    });
  }


  ngOnInit() {
  }

  getInvoiceByDate() {
    if (this.toDate != null && this.fromDate != null) {
      let today = new Date(this.toDate.formatted);
      today.setDate(today.getDate() + 1);

      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let y = today.getFullYear();

      let someFormattedDateToDate = y + '-' + mm + '-' + dd;
      this.invoiceService.getInvoiceByDateRange(this.fromDate.formatted, someFormattedDateToDate).then((response) => {
        let retunData = response.json();
        if (retunData.statusCode == 200) {
          this.InvoiceList = retunData.result;
        }
      });
    } else {
      this.alertify.error('Please select date...');
    }
  }

  getItemListById(id) {
    this.invoiceNumber = id;
    let selectedItemList = [];
    this.selectedItemList = [];
    this.receivedItemList = [];
    if (id != -1) {
      this.invoiceService.getInvoiceDetailByInvoiceId(id).then(response => {
        selectedItemList = response.json().result;
        selectedItemList.forEach(element => {
          if (_.find(this.selectedItemList, { 'itemId': element.itemId }) == null) {
            element.quantity = element.quantity - element.receivedQuantity;
            if (element.quantity != 0) {
              this.selectedItemList.push(element);
            }

          } else {
            let findItem = _.find(this.selectedItemList, { 'itemId': element.itemId });
            _.remove(this.selectedItemList, { 'itemId': element.itemId });
            findItem.quantity = findItem.quantity + element.quantity - element.receivedQuantity;
            if (findItem.quantity) {
              this.selectedItemList.push(findItem);
            }

          }
        });
        console.log("Item List", this.selectedItemList);
      });

    } else {

      this.receivedItemList = [];
      // this.SelectedJobItemList = [];
      // this.receivedItemList = [];
      // this.selectedJobId = 0;

    }
  }
  addReceviedItem(id) {
    id = Number(id);
    if (id != -1 && id != 0) {
      let findItem = _.find(this.selectedItemList, { 'itemId': id });
      console.log("find Item", findItem);
      if (_.find(this.receivedItemList, { 'itemId': findItem.itemId }) == null) {
        this.receivedItemList.push(findItem);
        findItem.receivedQuantity = 1;
      }

    } else {
      this.alertify.error('Select Job');
    }
  }
  removeReceivedItem(id) {
    id = Number(id);
    if (_.find(this.receivedItemList, { 'itemId': id }) != null) {

      _.remove(this.receivedItemList, { 'itemId': id });
    }
  }
  addReceivedQTY(itemId, qty, event) {
    itemId = Number(itemId);
    qty = Number(qty);
    let findItem = _.find(this.receivedItemList, { 'itemId': itemId });
    _.remove(this.receivedItemList, { 'itemId': itemId });
    if (findItem.quantity >= qty) {

      findItem.receivedQuantity = qty;
      this.receivedItemList.push(findItem);
    } else {
      this.alertify.error('Quantity more than send quantity');
      findItem.receivedQuantity = 1;
      this.receivedItemList.push(findItem);
      event.target.value = 1;
    }
  }
  addReturnItem() {
    if (this.invoiceNumber == 0) {
      this.alertify.error('Select Invoice');
      return false;
    }
    if (this.receivedItemList.length == 0) {
      this.alertify.error('Add at lease one item');
      return false;
    }
    if (this.returnDate == null) {
      this.alertify.error('Please select return date');
      return false;
    }
    if (this.returnDescription == "") {
      this.alertify.error('Please Description');
      return false;
    }
    let innerThis = this;
    let invoiceTosave = new InvoiceModel;
    invoiceTosave.id = innerThis.invoiceNumber;
    invoiceTosave.itemList = innerThis.receivedItemList;
    invoiceTosave.returnDescription =this.returnDescription;
    invoiceTosave.returnDate =this.returnDate.formatted;


    console.log("Item Details==== ", invoiceTosave);
    this.alertify.confirm('Add Return Item', 'Are you sure you want to add Item', function () {
      innerThis.invoiceService.addRetunItem(invoiceTosave).then(response => {
        if (response.json().statusCode == 200) {
          innerThis.alertify.success('Create successfull');

          let today = new Date(innerThis.toDate.formatted);
          let dd = today.getDate();
          let mm = today.getMonth() + 1;
          let y = today.getFullYear();
          let someFormattedDateToDate = y + '-' + mm + '-' + dd;
          innerThis.selectedItemList = [];
          innerThis.InvoiceList = [];
          innerThis.receivedItemList = [];
          innerThis.returnDescription="";

          innerThis.invoiceService.getInvoiceByDateRange(innerThis.fromDate.formatted, someFormattedDateToDate).then((response) => {
            let retunData = response.json();
            if (retunData.statusCode == 200) {
              innerThis.InvoiceList = retunData.result;
              console.log("Invoice ====", innerThis.InvoiceList);
            }
          });

        } else {
          innerThis.alertify.error('Create un-successfull');
        }

      });

    });
  }
}
