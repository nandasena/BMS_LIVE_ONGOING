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
  mainCategoryList = [];
  subCategoryList=[];
  selectedSubCategory=[];
  itemDetailList = [];
  invoiceToSave: InvoiceModel;
  itemToSave: Item[] = []
  selectedItem;
  totalAmount: number = 0.00;
  model = { date: {}, formatted: '' };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy/mm/dd',
  };
  balance: number = 0.00;
  cash: number;




  constructor(private invoiceService: InvoiceService, private alertify: AlertifyService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    var modal = document.getElementById("myModal");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    var span = document.getElementsByClassName("close")[0];
    this.invoiceService.getMaiCategoryList().then((response) => {
      this.mainCategoryList = response.json().result;
    })

    this.invoiceService.getSubCategoryList().then((response) => {
      this.subCategoryList = response.json().result;
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
    this.categoryWiseItemList = _.filter(this.itemList, { 'subCategoryId': id });
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
          item.subCategoryId = Number(this.selectedItem.subCategoryId);
          item.name = this.selectedItem.description;
          item.itemDetailId = this.selectedItem.itemDetailList[0].itemDetailId;
          item.sellingQuantity = 1
          item.availableQuantity = this.selectedItem.itemDetailList[0].availableQuantity;
          item.price = this.selectedItem.itemDetailList[0].mrpPrice;
          item.id = length + 1;
          item.itemId = this.selectedItem.itemId;
          item.discountPercentage=0;
          item.total=this.selectedItem.itemDetailList[0].mrpPrice*1
          this.itemToSave.push(item);
          this.calculateTotal();
        } else {
          let price =foundItem.price
          let qty =foundItem.sellingQuantity;
          foundItem.sellingQuantity++
          foundItem.total=price*(++qty)
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
      item.subCategoryId = Number(this.selectedItem.subCategoryId);
      item.name = this.selectedItem.description;
      item.itemDetailId = selectedDetail.itemDetailId;
      item.sellingQuantity = 1
      item.availableQuantity = selectedDetail.availableQuantity;
      item.price = selectedDetail.mrpPrice;
      item.itemId = this.selectedItem.itemId;
      item.discountPercentage=0;
      item.total=item.price*item.sellingQuantity
      item.id = length + 1;
      this.itemToSave.push(item);
      this.calculateTotal();
    } else {
      let price =foundItem.price
      let qty =foundItem.sellingQuantity;
      foundItem.sellingQuantity++
      foundItem.total=price*(qty++)
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
    
    let price =findItem.price
    findItem.sellingQuantity++
    findItem.total=price*qty
    findItem.sellingQuantity++
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
    this.itemToSave.forEach(item => {
      this.totalAmount += (item.sellingQuantity * item.price * _.round(1-(item.discountPercentage/100),2))
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
          innerThis.spinner.show();
          let resultObj = response.json();
          if (resultObj.statusCode == 200 && resultObj.success) {

            innerThis.spinner.hide();
            innerThis.alertify.success('Create successfull');
            innerThis.itemToSave = [];
          } else {
            innerThis.spinner.hide();
            innerThis.alertify.error('Create un-successfull');
            innerThis.itemToSave = [];

          }
        })
      });

    } else {
      this.alertify.error('Please add item....');
    }

  }

  getBalanceAmount(cash) {
    this.cash =cash;
    this.balance = cash - this.totalAmount
  }

  getSubCategory(id){
    id =Number(id);
    this.selectedSubCategory=  _.filter(this.subCategoryList, { 'mainCategoryId': id })
  }
  setDiscount(discountPer,itemId){
    let findItem = _.find(this.itemToSave, { 'itemId': itemId })
    _.remove(this.itemToSave, { 'itemId': itemId })
    let price =findItem.price
    let qty =findItem.sellingQuantity;
    findItem.total =price*qty*_.round((1-(discountPer/100)),2)
    findItem.discountPercentage =Number(discountPer);
    this.itemToSave.push(findItem);
    this.calculateTotal();
  }

}
