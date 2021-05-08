import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../services/invoice.service';
import { JobService } from '../../../services/job.service';
import { Item } from '../../../models/item_modal';
import {Job} from '../../../models/job.model'
import {PriceList} from '../../../models/price-list.modal'
import { PaymentModal } from '../../../models/payment-modal';
import { InvoiceModel } from '../../../models/invoice-modal';
import {Customer} from '../../../models/customer_model';
import { AlertifyService } from '../../../services/alertify.service';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
// import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'invoice-add',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  uom: number;
  description: string;
  itemList = [];
  categoryWiseItemList = [];
  addedItemList = [];
  assignee: number;
  mainCategoryList = [];
  subCategoryList = [];
  selectedSubCategory = [];
  itemDetailList = [];
  invoiceToSave: InvoiceModel;
  itemToSave: Item[] = [];
  job:Job;;
  selectedItem;
  totalAmount: number = 0.00;
  totalDiscount:number =0.00;
  model = { date: {}, formatted: '' };
  startDate = { date: {}, formatted: '' };
  endDate =   { date: {}, formatted: '' }
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  chequeDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  // chequeDate = { date: {}, formatted: '' };
  chequeDate=null;
  balance: number = 0.00;
  cash: number = 0.00;
  advance:number = 0.00;
  selectedBankId=-1;
  selectedItemId: number;
  customerList = [];
  selectedCustomerName: string = '';
  selectedCustomerId: number;
  selectedCustomer
  showChequeFild: boolean = false;
  showCardFild: boolean = false;
  modalReference: NgbModalRef;
  paymentType = '';
  paymentDetailList: PaymentModal[] = [];
  paymentDetail;
  chequeNo: string = '';
  carsRefNo: string = '';
  chequeDescription:string='';
  isCheckedCash: boolean = true;
  isCheckedCheque: boolean = false;
  isCheckedCreditCard: boolean = false;
  isCheckedDebitCard: boolean = false;
  isCheckedCredit: boolean = false;
  isShowCashFild: boolean = true;
  printDetails: String = '';
  bankList = [];
  customerName:string ='';
  customerAddress:string ='';
  customerTelephone:string ='';
  customerDetails:Customer = new Customer;
  otherExpenses  =[];
  addedOtherExpenses=[];
  jobName:string ="";
  ratePerSquareFeet:number =0.00;
  squareFeet:number=0.00;




  constructor(private invoiceService: InvoiceService, private alertify: AlertifyService, private spinner: NgxSpinnerService,
             private el: ElementRef, private modalService: NgbModal,private JobService:JobService) { }

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

    this.invoiceService.getCustomerList().then((response) => {
      this.customerList = response.json().result;
    })

    this.JobService.getAllRating().then((response) =>{
      this.otherExpenses = response.json().result;
    })

    this.model = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };

    this.startDate ={
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };
    this.endDate ={
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };

    // this.chequeDate = {
    //   date: {
    //     year: moment().year(),
    //     month: (moment().month() + 1),
    //     day: moment().date()
    //   }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    // };

    this.selectPaymentType('CH')

    this.invoiceService.getBankList().then((responce) => {
      let result = responce.json();
      if (result.success) {
        this.bankList = result.result
      }

    });

  }


  getItemsOfRelevetCategory(id) {
    id = Number(id)
    this.categoryWiseItemList = _.filter(this.itemList, { 'subCategoryId': id });
  }

  addSelectedItemToTable(id, event) {
    let priceList: PriceList[] = [] ;
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

      if (typeof this.selectedItem.itemDetailList[0] != 'undefined') {

      console.log("selected item is =====",this.selectedItem);  
      this.closeModal()

      let price1 = new PriceList;
      price1.paymentId=1;
      price1.price =this.selectedItem.itemDetailList[0].mrpPrice;
      price1.priceName="MRP"
      priceList.push(price1);

      let price = new PriceList;
      price.paymentId=2;
      price.price =this.selectedItem.itemDetailList[0].fabricatorPrice;;
      price.priceName="Fabric"
      priceList.push(price);

      let price2 = new PriceList;
      price2.paymentId=3;
      price2.price =this.selectedItem.itemDetailList[0].customerPrice;;
      price2.priceName="Customer"
      priceList.push(price2);

        if (this.selectedItem.itemDetailList[0].availableQuantity >= 1) {
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
            item.typeOfPrice = 1;
            item.id = length + 1;
            item.itemId = this.selectedItem.itemId;
            item.discountPercentage = 0;
            item.total = this.selectedItem.itemDetailList[0].costPrice * 1;
            item.priceList =priceList;
            item.priceName ='MRP';
            item.typeOfDiscount =1;
            item.priceDiscount =0;
            item.priceDiscountTotalItemWise =0;
            item.cost =this.selectedItem.itemDetailList[0].costPrice;

            this.itemToSave.push(item);
            // console.log("test====",this.itemToSave);
            this.calculateTotal();
          } else {
            if (this.selectedItem.itemDetailList[0].availableQuantity > foundItem.sellingQuantity) {
              if(foundItem.typeOfDiscount ==2){
                let price = foundItem.price;
                let qty = foundItem.sellingQuantity;
                foundItem.sellingQuantity++;
                foundItem.total = price * (++qty) * _.round(1 - (foundItem.discountPercentage / 100), 4)
              }else{
                let price = foundItem.price;
                foundItem.sellingQuantity++;
                foundItem.priceDiscountTotalItemWise =foundItem.priceDiscount * (foundItem.sellingQuantity);
                foundItem.total = price * (foundItem.sellingQuantity) - foundItem.priceDiscountTotalItemWise;
              }
              

            } else {
              this.alertify.error('Quantity not enough...');
            }
            this.itemToSave.push(foundItem);
            this.calculateTotal();
          }
        } else {
          this.alertify.error('Quantity not avalable...');
        }
      } else {
        this.alertify.error('Item not here');
      }
    }

  }


// --------------------------------------------------------------------------------------------------------------------------

  changePrice(value, item) {
    value = Number(value);
    let priceList = item.priceList;
    let selectedPrice = _.find(priceList, { 'paymentId': value });
    let foundItem = _.find(this.itemToSave, { 'itemDetailId': item.itemDetailId });
    _.remove(this.itemToSave, { 'itemDetailId': item.itemDetailId });
    foundItem.price = Number(selectedPrice.price);
    foundItem.typeOfPrice = selectedPrice.paymentId;
    foundItem.priceName = selectedPrice.priceName;
    if (foundItem.typeOfDiscount == 1) {
      foundItem.total = (foundItem.sellingQuantity * Number(selectedPrice.price)) - foundItem.priceDiscount;
    } else {
      foundItem.total = (foundItem.sellingQuantity * Number(selectedPrice.price) * _.round(1 - (foundItem.discountPercentage / 100), 4));
    }
    this.itemToSave.push(foundItem);
    this.calculateTotal();
  };

 
  changeDiscountType(value, item) {
    let foundItem = _.find(this.itemToSave, { 'itemDetailId': item.itemDetailId });
    _.remove(this.itemToSave, { 'itemDetailId': item.itemDetailId });
    foundItem.typeOfDiscount = value;
    foundItem.priceDiscount = 0;
    this.itemToSave.push(foundItem);
    this.setDiscount(0, item.itemDetailId);

  }
  setPriceDiscount(value, itemId) {
    let foundItem = _.find(this.itemToSave, { 'itemDetailId': itemId });
    _.remove(this.itemToSave, { 'itemDetailId': itemId });

    let price = foundItem.cost;
    let qty = foundItem.sellingQuantity;
    foundItem.priceDiscount =value;
    foundItem.priceDiscountTotalItemWise =value*qty;
    foundItem.total = (price * qty) - value*qty;
    this.itemToSave.push(foundItem);

    this.calculateTotal();
  }

// ---------------------------------------------------------------------------------------------------------------------------


  selectedItemDetails(itemDetailId) {
    itemDetailId = Number(itemDetailId);
    let foundItem = _.find(this.itemToSave, { 'itemDetailId': itemDetailId })
    _.remove(this.itemToSave, { 'itemDetailId': itemDetailId })
    if (foundItem == null) {
      let length = this.itemToSave.length;
      let selectedDetail = _.find(this.selectedItem.itemDetailList, { 'itemDetailId': itemDetailId });

      let priceList: PriceList[] = [] ;
      let price1 = new PriceList;
      price1.paymentId=1;
      price1.price =selectedDetail.mrpPrice;
      price1.priceName="MRP"
      priceList.push(price1);

      let price = new PriceList;
      price.paymentId=2;
      price.price =selectedDetail.fabricatorPrice;;
      price.priceName="Fabric"
      priceList.push(price);

      let price2 = new PriceList;
      price2.paymentId=3;
      price2.price =selectedDetail.customerPrice;;
      price2.priceName="Customer"
      priceList.push(price2);

      
      if (selectedDetail.availableQuantity >= 1) {
        let item = new Item();
        item.subCategoryId = Number(this.selectedItem.subCategoryId);
        item.name = this.selectedItem.description;
        item.itemDetailId = selectedDetail.itemDetailId;
        item.sellingQuantity = 1
        item.availableQuantity = selectedDetail.availableQuantity;
        item.price = selectedDetail.mrpPrice;
        item.itemId = this.selectedItem.itemId;
        item.discountPercentage = 0;
        item.total = item.cost * item.sellingQuantity;
        item.priceList = priceList;
        item.typeOfPrice = 1
        item.priceName='MRP';
        item.id = length + 1;
        item.typeOfDiscount =1;
        item.priceDiscount =0
        item.priceDiscountTotalItemWise =0;
        this.itemToSave.push(item);
        this.calculateTotal();
      } else {
        this.alertify.error('Quantity not avalable...');
      }

    } else {
      if (foundItem.availableQuantity > foundItem.sellingQuantity) {
        let cost = foundItem.cost
        let qty = foundItem.sellingQuantity;
        foundItem.sellingQuantity++
        foundItem.total = cost * (++qty) * _.round(1 - (foundItem.discountPercentage / 100), 4)

      } else {
        this.alertify.error('Quantity not enough...');
      }
      this.itemToSave.push(foundItem);
      this.calculateTotal();
    }

    this.closeModal()
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  changeQty(itemDetailId, qty, event) {
    this.selectedItemId = itemDetailId;
    if (qty == 0 || qty == null) {
      qty = 1;
    }
    let findItem = _.find(this.itemToSave, { 'itemDetailId': itemDetailId })
    _.remove(this.itemToSave, { 'itemDetailId': itemDetailId })
    if (findItem.availableQuantity >= Number(qty)) {
      let cost = findItem.cost;
      findItem.sellingQuantity++;
      if (findItem.typeOfDiscount == 1) {
        console.log("Change QTY",findItem);
        findItem.priceDiscountTotalItemWise = findItem.priceDiscount * qty;
        findItem.total = (cost * qty) - (findItem.priceDiscountTotalItemWise);
      } else {
        findItem.total = cost * qty * _.round(1 - (findItem.discountPercentage / 100), 4)
      }

      findItem.sellingQuantity++;
      findItem.sellingQuantity = qty;
      this.itemToSave.push(findItem);
      this.calculateTotal();
    } else {
      this.alertify.error('Entered quantity is more than available quantity');
      let cost = findItem.cost;
      findItem.sellingQuantity = Number(1);
      findItem.total = cost * Number(1) * _.round(1 - (findItem.discountPercentage / 100), 4)
      event.target.value = 1;
      this.itemToSave.push(findItem);
      this.calculateTotal();
    }

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
    this.totalDiscount =0.00;
    console.log("calculateTotal",this.itemToSave);
    this.itemToSave.forEach(item => {
      if(item.typeOfDiscount == 1){
        this.totalAmount += (item.sellingQuantity * item.cost) - Number(item.priceDiscountTotalItemWise);
        this.totalDiscount += Number(item.priceDiscountTotalItemWise);
      }else{
        this.totalAmount += (item.sellingQuantity * item.cost * _.round(1 - (item.discountPercentage / 100), 4));
        this.totalDiscount += (item.sellingQuantity * item.cost * _.round((item.discountPercentage / 100), 4));
      }
      
    });

    this.balance = this.totalAmount;
    this.itemToSave = _.orderBy(this.itemToSave, ['id'], ['desc']);

  }
  selectPaymentType(values) {
    this.showChequeFild = false;
    this.showCardFild = false;
    this.paymentType = values;
    this.paymentDetail = new PaymentModal();
    this.paymentDetail.typeCode = this.paymentType;
    if (this.paymentType == 'CR') {
      this.isShowCashFild = false;
      this.chequeNo = '';
      this.carsRefNo = '';
      this.chequeDescription = '';
      this.selectedBankId = -1;
      this.chequeDate=null;
    }
    if (this.paymentType == 'CQ') {
      this.showChequeFild = true;
      this.isShowCashFild = true;
      this.carsRefNo = '';
    }
    if (this.paymentType == 'CD') {
      this.showCardFild = true;
      this.isShowCashFild = true;
      this.chequeNo = '';
      this.chequeDescription = '';
      this.selectedBankId = -1;
      this.chequeDate=null;

    }
    if (this.paymentType == 'CH') {
      this.chequeNo = '';
      this.carsRefNo = '';
      this.chequeDescription = '';
      this.selectedBankId = -1;
      this.isShowCashFild = true;
      this.chequeDate=null;
    }
    if (this.paymentType == 'DB') {
      this.showCardFild = true;
      this.isShowCashFild = true;
      this.chequeNo = '';
      this.selectedBankId = -1;
      this.chequeDescription = '';
      this.chequeDate=null;
    }
  }
  saveInvoice() {
    if (this.itemToSave.length != 0) {
      if (this.model == null) {
        this.alertify.error('Please add Job date....');
        return false;
      } 
      if(this.startDate ==null){
        this.alertify.error('Please add start date....');
        return false;
      }
      if(this.endDate == null){
        this.alertify.error('Please add end date....');
        return false;
      }
      if(this.jobName ==""){
        this.alertify.error('Please add job name....');
        return false;   
      }
      if(this.ratePerSquareFeet== 0){
        this.alertify.error('Please add rate....');
        return false; 
      }
      if(this.squareFeet == 0){
        this.alertify.error('Please add square feet....');
        return false;
      }

      if (this.paymentDetail.typeCode != 'CR') {
        if (this.balance > 0) {
          this.alertify.error('Balance amount more than total amount ....');
          return false;
        }
        
        this.customerName.replace(/ {2,}/g, ' ').trim();
        this.customerDetails.firstName =this.customerName;
        this.customerDetails.contactNumber =this.customerTelephone;
        this.customerDetails.address1 = this.customerAddress;


      }
      if (this.showChequeFild) {
        if (this.chequeNo == '') {
          this.alertify.error('Please add cheque number....');
          return false;
        }
        if(this.chequeDate==null){
          this.alertify.error('Please add cheque date....');
          return false;
        }
        if(this.chequeDescription==''){
          this.alertify.error('Please add Description....');
          return false;
        }
        if(this.selectedBankId == -1){
          this.alertify.error('Please select bank....');
          return false;
        }
        if (this.selectedCustomerId == null) {
          this.alertify.error('Please select customer....');
          return false;
        }

      }
      if (this.showCardFild) {
        if (this.carsRefNo == "") {
          this.alertify.error('Please add ref number....');
          return false;
        }

      }
      if (this.paymentDetail.typeCode == 'CR') {
        if (this.selectedCustomerId == null) {
          this.alertify.error('Please select customer for credit invoice....');
          return false;
        }
      }
      let innerThis = this;
      this.paymentDetailList.pop();
      this.paymentDetail.amount = this.totalAmount;
      this.paymentDetail.advancePayment =this.advance;
      this.chequeNo == '' ? this.paymentDetail.chequeNumber = null : this.paymentDetail.chequeNumber = this.chequeNo;
      this.carsRefNo == "" ? this.paymentDetail.cardNumber = null : this.paymentDetail.cardNumber = this.carsRefNo;
      this.chequeDescription=='' ? this.paymentDetail.description=null: this.paymentDetail.description = this.chequeDescription;
      this.selectedBankId == -1 ? this.paymentDetail.bankId =null : this.paymentDetail.bankId =this.selectedBankId;
      this.paymentDetail.chequeDate = this.chequeDate==null?null:this.chequeDate.formatted;

      this.paymentDetailList.push(this.paymentDetail);
      this.alertify.confirm('Create Invoice', 'Are you sure you want to create invoice', function () {
        let joibTosave = new Job;

        joibTosave.amount = innerThis.totalAmount;
        joibTosave.squareFeet = innerThis.squareFeet;
        joibTosave.description="";
        joibTosave.ratePerSquareFeet =innerThis.ratePerSquareFeet;
        joibTosave.customerId = innerThis.selectedCustomerId;
        joibTosave.startDate =innerThis.startDate.formatted;
        joibTosave.endDate =innerThis.endDate.formatted;
        joibTosave.jobDate = innerThis.model.formatted;
        joibTosave.state =1;
        joibTosave.name =innerThis.jobName;
        joibTosave.itemVOList = innerThis.itemToSave;
        joibTosave.paymentDetailList = innerThis.paymentDetailList;

        innerThis.JobService.saveJob(joibTosave).then((response) => {
          innerThis.spinner.show();
          let resultObj = response.json();
          if (resultObj.statusCode == 200 && resultObj.success) {

            innerThis.spinner.hide();
            // innerThis.printInvoice(invoiceTosave, resultObj.result);
            innerThis.alertify.success('Create successfull');
            innerThis.itemToSave = [];
            innerThis.totalAmount = 0.00;
            innerThis.balance = 0.00;
            innerThis.cash = 0.00;
            innerThis.advance =0.00;
            innerThis.customerName ='';
            innerThis.customerAddress ='';
            innerThis.customerTelephone ='';

            innerThis.selectedCustomer = ""
            innerThis.invoiceService.getItemList().then((response) => {
              innerThis.itemList = response.json().result;
            });
            innerThis.categoryWiseItemList = [];
            innerThis.selectedSubCategory = [];
            innerThis.mainCategoryList = [];
            innerThis.invoiceService.getMaiCategoryList().then((response) => {
              innerThis.mainCategoryList = response.json().result;
            })
            innerThis.closeModalWindow();


          } else {
            innerThis.spinner.hide();
            innerThis.alertify.error('Create un-successfull');
            innerThis.itemToSave = [];
            innerThis.closeModalWindow();

          }
        })
      });

    } else {
      this.alertify.error('Please add item....');
    }

  }

  getBalanceAmount(cash,type) {
    if(cash ==""){
      cash = '0';
      console.log("send data is =====",cash);  
    }
    if(type ==1){
      this.advance = parseFloat(cash.replace(/,/g, ''));
    }else{
      this.cash = parseFloat(cash.replace(/,/g, ''));
      
    }
    this.totalAmount = Math.round((this.totalAmount + Number.EPSILON) * 100) / 100;
    this.balance = this.totalAmount - (this.cash + this.advance);
  }

  getSubCategory(id) {
    id = Number(id);
    this.selectedSubCategory = _.filter(this.subCategoryList, { 'mainCategoryId': id })
    this.categoryWiseItemList = [];
  }
  setDiscount(discountPer, itemId) {
    let findItem = _.find(this.itemToSave, { 'itemDetailId': itemId })
    _.remove(this.itemToSave, { 'itemDetailId': itemId })
    let cost = findItem.cost
    let qty = findItem.sellingQuantity;
    findItem.total = cost * qty * _.round((1 - (discountPer / 100)), 4)
    findItem.discountPercentage = Number(discountPer);
    this.itemToSave.push(findItem);
    this.calculateTotal();
  }
  addCustomerName(customerId, event) {
    event.target.value = '';
    this.selectedCustomerId = null;
    this.selectedCustomerName = '';
    customerId = Number(customerId);
    if (customerId == -1) {
      this.selectedCustomerName = '';
    } else {
      let selectedCustomer = _.find(this.customerList, { 'customerId': customerId });
      if (selectedCustomer != null) {
        this.selectedCustomerName = selectedCustomer.firstName;
        event.target.value = this.selectedCustomerName;
        this.selectedCustomerId = selectedCustomer.customerId;
      }

    }
  }

  getItemByItemCode(itemCode, event) {
    this.invoiceService.getItemByItemCode(itemCode.trim()).then((response) => {
      let getItem = response.json().result;
      if (getItem != null) {
        this.selectedItem = getItem;
        if (this.selectedItem.itemDetailList.length > 1) {
          var modal = document.getElementById("myModal");
          this.itemDetailList = this.selectedItem.itemDetailList;
          modal.style.display = "block";

        } else {
          this.closeModal()

          if (typeof this.selectedItem.itemDetailList[0] != 'undefined') {

            if (this.selectedItem.itemDetailList[0].availableQuantity >= 1) {
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
                item.discountPercentage = 0;
                item.total = this.selectedItem.itemDetailList[0].mrpPrice * 1
                this.itemToSave.push(item);
                this.calculateTotal();
              } else {
                if (this.selectedItem.itemDetailList[0].availableQuantity > foundItem.sellingQuantity) {
                  let price = foundItem.price
                  let qty = foundItem.sellingQuantity;
                  foundItem.sellingQuantity++
                  foundItem.total = price * (++qty) * _.round(1 - (foundItem.discountPercentage / 100), 4)

                } else {
                  this.alertify.error('Quantity not enough...');
                }
                this.itemToSave.push(foundItem);
                this.calculateTotal();
              }
            } else {
              this.alertify.error('Quantity not avalable...');
            }
          } else {
            this.alertify.error('Item not here');
          }
        }
      } else {
        this.alertify.error('Item Not Found....');
      }
      event.target.value = '';
    })

  }

  openModalWindow(content) {
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
    this.chequeDescription = '';
    this.selectedBankId=-1;
    this.chequeDate=null;
    this.modalReference = this.modalService.open(content, { size: 'lg' });
  }
  closeModalWindow() {
    this.balance = this.totalAmount;
    this.advance=0.00;
    this.cash = 0.00;
    this.paymentDetail.typeCode = 'CH';
    this.isShowCashFild = true;
    this.modalReference.close();
  }


  setSelectedBank(selectedBankId) {
    console.log("selected Bank is =====", selectedBankId)
    this.selectedBankId =selectedBankId
  }
  addOtherExpenses(id){
    if(id !=-1){
      console.log("type",typeof id)
      let selectedExpensesType = _.find(this.otherExpenses,{ 'id': Number(id) });
      console.log("findItem ===",selectedExpensesType);
      let selectedExpenses={
       "id":selectedExpensesType.id,
       "name":selectedExpensesType.name,
       "amount":0.00,
       "date" :"",
       "description":""
    }
    
      this.addedOtherExpenses.push(selectedExpenses);
      console.log("Expenses",this.addedOtherExpenses);
    }else{
      this.alertify.error('Please Select Expenses'); 
    }
  }
  clearName(){
    this.selectedCustomer ="";
  }

  // printInvoice(invoiceTosave,insertObject) {
  //   var invoiceWindow = window.open("", "print-window");
  //   let ItemList =invoiceTosave.itemList;
  //   for (var x = 0; x < ItemList.length; x++) {

  //     this.printDetails = this.printDetails + '<tr><td style="height:20px;width:51%;text-align:left;font-size:14px;padding-top:4px;">' + ItemList[x].name + '</td><td style="height:20px;width:21%;text-align:right;font-size:14px;padding-top:4px;">' +
  //     parseFloat(ItemList[x].price.toString()).toFixed(2).replace(/./g, function (c, i, a) {
  //       return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //     }) + '</td><td style="height:20px;width:10%;text-align:right;font-size:14px;padding-top:4px;">' + ItemList[x].sellingQuantity + '</td>'+
  //   '</td><td style="height:20px;width:20%;text-align:right;font-size: 14px;padding-top:4px;">' + parseFloat(ItemList[x].total).toFixed(2).replace(/./g, function (c, i, a) {
  //     return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //     }) + '</td>' +
  //   '</tr>'
  //   }

  //    invoiceWindow.document.write(
  //   '<div width=80>' +
  //           `<table style="width:100%;">
  //           <br><br><br><br><br><br>
  //           <p style="font-size:14px;padding-left:25px;margin:2px;">`+  insertObject.tempCustomerVO.firstName +` </p>
  //           <p style="font-size:14px;padding-left:25px;margin:2px;">`+  insertObject.tempCustomerVO.address1 + `</p>
  //           <p style="font-size:14px;padding-left:25px;margin:2px;">` + insertObject.tempCustomerVO.contactNumber +`</p>
  //           <p style="font-size:14px;padding-left:25px;margin:2px;">` + insertObject.invoiceDate +`</p>
  //           </table>
  //           <br><br><br>
  //           <br/>
  //           <br/> 
  //           <br/>
           

  //           <table  style="margin-left:8%;width:93%;text-align:right;">

  //           <tbody > `+ this.printDetails + `</tbody>
  //           </table> 


  //           <div class="row">

  //           <table style="margin-left:8%;width:93%;text-align:right;">
  //            <thead  > <tr>
  //            <th style= " text-align:left; height: 20px; width:48%;">Total
  //            </th>
  //           <th style=" text-align:right;height: 20px; width:24%;">`+ parseFloat(invoiceTosave.totalAmount+insertObject.invoiceDiscount).toFixed(2).replace(/./g, function (c, i, a) {
  //           return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //           }) +
  //           `</th></tr> 
  //             <tr>
  //             <th style=" text-align:left; height: 20px; width:48%; "> Discount
  //             </th>  
  //              <th style=" text-align:right;height: 20px; width:22%; ">`+ parseFloat(insertObject.invoiceDiscount).toFixed(2).replace(/./g, function (c, i, a) {
  //           return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //           }) +
  //           `</th> 
  //              </tr>
  //              <tr>
  //              <th style="text-align:left; height: 20px; width:48%; ">Net Total
  //              </th> 
  //               <th style=" text-align:right;height: 20px; width:22%; ">`+ (parseFloat(invoiceTosave.totalAmount)).toFixed(2).replace(/./g, function (c, i, a) {
  //           return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //           }) +
  //           `</th>`
  //           +
  //           `</th> 
  //              </tr>
  //              <tr>
  //              <th style="text-align:left; height: 20px; width:48%; ">Advance Amount
  //              </th> 
  //               <th style=" text-align:right;height: 20px; width:22%; ">`+ (parseFloat(insertObject.advanceAmount)).toFixed(2).replace(/./g, function (c, i, a) {
  //           return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //           }) +
  //           `</th>`
  //           +
  //           `</th> 
  //              </tr>
  //              <tr>
  //              <th style="text-align:left; height: 20px; width:48%; ">Balance Amount
  //              </th> 
  //               <th style=" text-align:right;height: 20px; width:22%; ">`+ (parseFloat(invoiceTosave.totalAmount) -parseFloat(insertObject.advanceAmount) ).toFixed(2).replace(/./g, function (c, i, a) {
  //           return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  //           }) +
  //           `</th>
  //               </tr> 
  //             </thead>
  //             <tbody > 
  //             </tbody>
  //             </table>
  //            </div><br/>
  //            <div class="row" style=""> 
  //        </div>
  //        <script>
  //           setTimeout(function () { window.print(); }, 500);
  //         </script>
  //     </div>`


  //    )
  //   setTimeout(function () { invoiceWindow.close(); }, 1000);
  //   this.printDetails = '';
  // }

}
