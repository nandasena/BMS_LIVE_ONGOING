import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { KpiModel } from '../../../models/kpi-model';
import { InvoiceService } from '../../../services/invoice.service';
import { Item } from '../../../models/item_modal';
import { InvoiceModel } from '../../../models/invoice-modal';
import { AlertifyService } from '../../../services/alertify.service';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
// import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'kpi-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
  kpiName: string;
  uom: number;
  description: string;
  itemList = [];
  categoryWiseItemList = [];
  addedItemList = [];
  assignee: number;
  categoryList = [];
  itemDetailList = [];
  invoiceToSave: InvoiceModel;
  itemToSave: Item[] = []
  selectedItem;
  totalAmount: number = 0.00;
  model = { date: {}, formatted: '' };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy/mm/dd',
  };


  //createKpi =new KpiModel;
  fk_period_quarter: number;



  constructor(private invoiceService: InvoiceService, private alertify: AlertifyService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    var modal = document.getElementById("myModal");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    var span = document.getElementsByClassName("close")[0];
    this.invoiceService.getCategoryList().then((response) => {
      this.categoryList = response.json().result;
    })

    this.invoiceService.getItemList().then((response) => {
      this.itemList = response.json().result;
    })

    this.model = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };
  }


  getItemsOfRelevetCategory(id) {
    id = Number(id)
    this.categoryWiseItemList = _.filter(this.itemList, { 'categoryId': id });
  }

  addSelectedItemToTable(id) {
    id = Number(id)
    if (id == -1) {
      this.alertify.error('Please select item');
      return false
    }


    this.selectedItem = _.find(this.categoryWiseItemList, { 'itemId': id })

    if (this.selectedItem.itemDetailList.length > 1) {
      var modal = document.getElementById("myModal");
      this.itemDetailList = this.selectedItem.itemDetailList;
      modal.style.display = "block";

    } else {
      this.closeModal()
      if (typeof this.selectedItem.itemDetailList[0] != 'undefined') {
        let foundItem = _.find(this.itemToSave, { 'itemDetailId': this.selectedItem.itemDetailList[0].itemDetailId })
        _.remove(this.itemToSave, { 'itemDetailId': this.selectedItem.itemDetailList[0].itemDetailId })
        let length = this.itemToSave.length;
        if (foundItem == null) {
          let item = new Item();
          item.categoryId = Number(this.selectedItem.categoryId);
          item.name = this.selectedItem.description;
          item.itemDetailId = this.selectedItem.itemDetailList[0].itemDetailId;
          item.sellingQuantity = 1
          item.availableQuantity = this.selectedItem.itemDetailList[0].availableQuantity;
          item.price = this.selectedItem.itemDetailList[0].sellingPrice;
          item.id = length + 1;
          item.itemId = this.selectedItem.itemId;
          this.itemToSave.push(item);
          this.calculateTotal();
        } else {
          foundItem.sellingQuantity++
          this.itemToSave.push(foundItem);
          this.calculateTotal();
        }
      } else {
        this.alertify.error('Item not here');
      }
    }

  }
  selectedItemDetails(itemDetailId) {
    itemDetailId = Number(itemDetailId);
    let foundItem = _.find(this.itemToSave, { 'itemDetailId': itemDetailId })
    _.remove(this.itemToSave, { 'itemDetailId': itemDetailId })
    if (foundItem == null) {
      let length = this.itemToSave.length;
      let selectedDetail = _.find(this.selectedItem.itemDetailList, { 'itemDetailId': itemDetailId })
      let item = new Item();
      item.categoryId = Number(this.selectedItem.categoryId);
      item.name = this.selectedItem.description;
      item.itemDetailId = selectedDetail.itemDetailId;
      item.sellingQuantity = 1
      item.availableQuantity = selectedDetail.availableQuantity;
      item.price = selectedDetail.sellingPrice;
      item.itemId = this.selectedItem.itemId;
      item.id = length + 1;
      this.itemToSave.push(item);
      this.calculateTotal();
    } else {
      foundItem.sellingQuantity++
      this.itemToSave.push(foundItem);
      this.calculateTotal();
    }

    this.closeModal()
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  changeQty(itemDetailId, qty) {
    if (qty == 0 || qty == null) {
      qty = 1;
    }
    let findItem = _.find(this.itemToSave, { 'itemDetailId': itemDetailId })
    _.remove(this.itemToSave, { 'itemDetailId': itemDetailId })
    findItem.sellingQuantity = qty;
    this.itemToSave.push(findItem);
    this.calculateTotal();

  }

  removeItem(itemDetailId) {
    _.remove(this.itemToSave, { 'itemDetailId': itemDetailId })
    this.itemToSave = _.orderBy(this.itemToSave, ['id'], ['asc']);
    this.itemToSave.forEach((item, index) => {
      item.id = index + 1;
    });
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = 0.00;
    this.itemToSave.forEach(element => {
      this.totalAmount += (element.sellingQuantity * element.price)
    });
    this.itemToSave = _.orderBy(this.itemToSave, ['id'], ['desc']);

  }
  saveInvoice() {
    if (this.itemToSave.length != 0) {
      if (this.model == null) {
        this.alertify.error('Please add date....');
        return false;
      }
      let innerThis = this;
      this.alertify.confirm('Create Invoice', 'Are you sure you want to create invoice', function () {
        let invoiceTosave = new InvoiceModel;
        invoiceTosave.totalAmount = innerThis.totalAmount;
        invoiceTosave.itemList = innerThis.itemToSave;
        invoiceTosave.balanceAmount = 0.00;
        invoiceTosave.customerName = 'Pasan Madusanka'
        invoiceTosave.invoiceDate = innerThis.model.formatted;
        innerThis.invoiceService.saveInvoice(invoiceTosave).then((response) => {
          this.spinner.show();
          let resultObj = response.json();
          if (resultObj.statusCode == 200 && resultObj.success) {
            this.spinner.hide();
            innerThis.alertify.error('Create successfull');  
          } else {
            this.spinner.hide();
            innerThis.alertify.error('Create un-successfull');
            
          }
        })
      });

    } else {
      this.alertify.error('Please add item....');
    }

  }

}
