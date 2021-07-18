import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../services/invoice.service';
import { JobService } from '../../../services/job.service';
import { Item } from '../../../models/item_modal';
import { Job } from '../../../models/job.model'
import { PriceList } from '../../../models/price-list.modal'
import { PaymentModal } from '../../../models/payment-modal';
import { InvoiceModel } from '../../../models/invoice-modal';
import { ItemModalWindowComponent } from '../item-modal-window/item-modal-window.component';
import { Customer } from '../../../models/customer_model';
import { AlertifyService } from '../../../services/alertify.service';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { SquareFeetComponent } from '../add-square-feet/square-feet/square-feet.component';


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
  savedItemList: Item[] = [];
  job: Job;;
  selectedItem;
  totalAmount: number = 0.00;
  totalDiscount: number = 0.00;
  model = { date: {}, formatted: '' };
  startDate = { date: {}, formatted: '' };
  endDate = { date: {}, formatted: '' }
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  chequeDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  // chequeDate = { date: {}, formatted: '' };
  chequeDate = null;
  balance: number = 0.00;
  cash: number = 0.00;
  advance: number = 0.00;
  selectedBankId = -1;
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
  chequeDescription: string = '';
  isCheckedCash: boolean = true;
  isCheckedCheque: boolean = false;
  isCheckedCreditCard: boolean = false;
  isCheckedDebitCard: boolean = false;
  isCheckedCredit: boolean = false;
  isShowCashFild: boolean = true;
  printDetails: String = '';
  bankList = [];
  customerName: string = '';
  customerAddress: string = '';
  customerTelephone: string = '';
  customerDetails: Customer = new Customer;
  otherExpenses = [];
  addedOtherExpenses = [];
  jobName: string = "";
  ratePerSquareFeet: number = 0.00;
  squareFeet: number = 0.00;
  jobList = [];
  selectedJobNo: number = -1;
  selectedJobId: number = -1;
  selectedJobName: string = '';
  selectedJob;
  isEditTrue = false;
  selectedJobNumber: string = '';
  isShow: boolean = false;
  totalInvoiceAmount: number;
  squareFeelList = [];




  constructor(private invoiceService: InvoiceService, private alertify: AlertifyService, private spinner: NgxSpinnerService,
    private el: ElementRef, private modalService: NgbModal, private JobService: JobService) { }

  ngOnInit() {
    var modal = document.getElementById("myModal");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    this.JobService.getJobList().then(response => {
      this.jobList = response.json().result;
    });

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

    this.JobService.getAllRating().then((response) => {
      this.otherExpenses = response.json().result;
    })

    this.model = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };

    this.startDate = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };
    this.endDate = {
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
    let priceList: PriceList[] = [];
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

        console.log("selected item is =====", this.selectedItem);
        this.closeModal()

        let price1 = new PriceList;
        price1.paymentId = 1;
        price1.price = this.selectedItem.itemDetailList[0].mrpPrice;
        price1.priceName = "MRP"
        priceList.push(price1);

        let price = new PriceList;
        price.paymentId = 2;
        price.price = this.selectedItem.itemDetailList[0].fabricatorPrice;;
        price.priceName = "Fabric"
        priceList.push(price);

        let price2 = new PriceList;
        price2.paymentId = 3;
        price2.price = this.selectedItem.itemDetailList[0].customerPrice;;
        price2.priceName = "Customer"
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
            item.priceList = priceList;
            item.priceName = 'MRP';
            item.typeOfDiscount = 1;
            item.priceDiscount = 0;
            item.priceDiscountTotalItemWise = 0;
            item.cost = this.selectedItem.itemDetailList[0].costPrice;

            this.itemToSave.push(item);
            // console.log("test====",this.itemToSave);
            this.calculateTotal();
          } else {
            if (this.selectedItem.itemDetailList[0].availableQuantity > foundItem.sellingQuantity) {
              if (foundItem.typeOfDiscount == 2) {
                let price = foundItem.price;
                let qty = foundItem.sellingQuantity;
                foundItem.sellingQuantity++;
                foundItem.total = price * (++qty) * _.round(1 - (foundItem.discountPercentage / 100), 4)
              } else {
                let price = foundItem.price;
                foundItem.sellingQuantity++;
                foundItem.priceDiscountTotalItemWise = foundItem.priceDiscount * (foundItem.sellingQuantity);
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
    foundItem.priceDiscount = value;
    foundItem.priceDiscountTotalItemWise = value * qty;
    foundItem.total = (price * qty) - value * qty;
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

      let priceList: PriceList[] = [];
      let price1 = new PriceList;
      price1.paymentId = 1;
      price1.price = selectedDetail.mrpPrice;
      price1.priceName = "MRP"
      priceList.push(price1);

      let price = new PriceList;
      price.paymentId = 2;
      price.price = selectedDetail.fabricatorPrice;;
      price.priceName = "Fabric"
      priceList.push(price);

      let price2 = new PriceList;
      price2.paymentId = 3;
      price2.price = selectedDetail.customerPrice;;
      price2.priceName = "Customer"
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
        item.priceName = 'MRP';
        item.id = length + 1;
        item.typeOfDiscount = 1;
        item.priceDiscount = 0
        item.priceDiscountTotalItemWise = 0;
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
        console.log("Change QTY", findItem);
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
    this.totalDiscount = 0.00;
    console.log("calculateTotal", this.itemToSave);
    this.itemToSave.forEach(item => {
      if (item.typeOfDiscount == 1) {
        this.totalAmount += (item.sellingQuantity * item.cost) - Number(item.priceDiscountTotalItemWise);
        this.totalDiscount += Number(item.priceDiscountTotalItemWise);
      } else {
        this.totalAmount += (item.sellingQuantity * item.cost * _.round(1 - (item.discountPercentage / 100), 4));
        this.totalDiscount += (item.sellingQuantity * item.cost * _.round((item.discountPercentage / 100), 4));
      }

    });

    // this.balance = this.totalAmount;
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
      this.chequeDate = null;
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
      this.chequeDate = null;

    }
    if (this.paymentType == 'CH') {
      this.chequeNo = '';
      this.carsRefNo = '';
      this.chequeDescription = '';
      this.selectedBankId = -1;
      this.isShowCashFild = true;
      this.chequeDate = null;
    }
    if (this.paymentType == 'DB') {
      this.showCardFild = true;
      this.isShowCashFild = true;
      this.chequeNo = '';
      this.selectedBankId = -1;
      this.chequeDescription = '';
      this.chequeDate = null;
    }
  }
  saveInvoice() {
    if (this.itemToSave.length != 0) {
      if (this.model == null) {
        this.alertify.error('Please add Job date....');
        return false;
      }
      if (this.startDate == null) {
        this.alertify.error('Please add start date....');
        return false;
      }
      if (this.endDate == null) {
        this.alertify.error('Please add end date....');
        return false;
      }
      if (!this.isEditTrue) {
        if (this.selectedCustomerId == null) {
          this.alertify.error('Please select customer....');
          return false;
        }
      }

      if (this.jobName == "") {
        this.alertify.error('Please add job name....');
        return false;
      }
      // if(this.ratePerSquareFeet== 0 || this.ratePerSquareFeet==null){
      //   this.alertify.error('Please add rate....');
      //   return false; 
      // }
      // if(this.squareFeet == 0 || this.squareFeet==null){
      //   this.alertify.error('Please add square feet....');
      //   return false;
      // }

      if (this.paymentDetail.typeCode != 'CR') {
        if (this.balance > 0) {
          this.alertify.error('Balance amount more than total amount ....');
          return false;
        }

        this.customerName.replace(/ {2,}/g, ' ').trim();
        this.customerDetails.firstName = this.customerName;
        this.customerDetails.contactNumber = this.customerTelephone;
        this.customerDetails.address1 = this.customerAddress;


      }
      if (this.showChequeFild) {
        if (this.chequeNo == '') {
          this.alertify.error('Please add cheque number....');
          return false;
        }
        if (this.chequeDate == null) {
          this.alertify.error('Please add cheque date....');
          return false;
        }
        if (this.chequeDescription == '') {
          this.alertify.error('Please add Description....');
          return false;
        }
        if (this.selectedBankId == -1) {
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
      this.paymentDetail.amount = this.cash;
      this.paymentDetail.advancePayment = this.advance;
      this.chequeNo == '' ? this.paymentDetail.chequeNumber = null : this.paymentDetail.chequeNumber = this.chequeNo;
      this.carsRefNo == "" ? this.paymentDetail.cardNumber = null : this.paymentDetail.cardNumber = this.carsRefNo;
      this.chequeDescription == '' ? this.paymentDetail.description = null : this.paymentDetail.description = this.chequeDescription;
      this.selectedBankId == -1 ? this.paymentDetail.bankId = null : this.paymentDetail.bankId = this.selectedBankId;
      this.paymentDetail.chequeDate = this.chequeDate == null ? null : this.chequeDate.formatted;

      this.paymentDetailList.push(this.paymentDetail);
      this.alertify.confirm('Create Invoice', 'Are you sure you want to create Job', function () {
        let joibTosave = new Job;

        joibTosave.amount = innerThis.totalAmount;
        joibTosave.squareFeet = innerThis.squareFeet;
        joibTosave.description = "";
        joibTosave.ratePerSquareFeet = innerThis.ratePerSquareFeet;
        joibTosave.customerId = innerThis.selectedCustomerId;
        joibTosave.startDate = innerThis.startDate.formatted;
        joibTosave.endDate = innerThis.endDate.formatted;
        joibTosave.jobDate = innerThis.model.formatted;
        joibTosave.state = 1;
        joibTosave.name = innerThis.jobName;
        joibTosave.itemVOList = innerThis.itemToSave;
        joibTosave.paymentDetailList = innerThis.paymentDetailList;
        joibTosave.jobId = innerThis.selectedJobId;
        joibTosave.jobSquareFeetDetailVOList = innerThis.squareFeelList;

        if (!innerThis.isEditTrue) {
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
              innerThis.advance = 0.00;
              innerThis.customerName = '';
              innerThis.customerAddress = '';
              innerThis.customerTelephone = '';
              innerThis.jobName = '';
              innerThis.squareFeet = 0.00;
              innerThis.ratePerSquareFeet = 0.00;
              innerThis.squareFeelList = [];

              innerThis.selectedCustomer = ""
              innerThis.invoiceService.getItemList().then((response) => {
                innerThis.itemList = response.json().result;
              });
              innerThis.JobService.getJobList().then(response => {
                innerThis.jobList = response.json().result;
              });
              innerThis.categoryWiseItemList = [];
              innerThis.selectedSubCategory = [];
              innerThis.mainCategoryList = [];
              innerThis.invoiceService.getMaiCategoryList().then((response) => {
                innerThis.mainCategoryList = response.json().result;
              })
              innerThis.closeModalWindow();
              innerThis.isShow = false;
              innerThis.isEditTrue = false;
              innerThis.selectedJobNumber = '';

            } else {
              innerThis.spinner.hide();
              innerThis.alertify.error('Create un-successfull');
              innerThis.itemToSave = [];
              innerThis.closeModalWindow();

            }
          });
        } else {
          innerThis.JobService.addNewItems(joibTosave).then((response) => {
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
              innerThis.advance = 0.00;
              innerThis.customerName = '';
              innerThis.customerAddress = '';
              innerThis.customerTelephone = '';
              innerThis.jobName = '';
              innerThis.squareFeet = 0.00;
              innerThis.ratePerSquareFeet = 0.00;

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
              innerThis.JobService.getJobList().then(response => {
                innerThis.jobList = response.json().result;
              });
              innerThis.isShow = false;
              innerThis.isEditTrue = false;
              innerThis.selectedJobNumber = '';
              innerThis.squareFeelList = [];

            } else {
              innerThis.spinner.hide();
              innerThis.alertify.error('Create un-successfull');
              innerThis.itemToSave = [];
              innerThis.closeModalWindow();

            }
          });
        }

      });

    } else {
      this.alertify.error('Please add item....');
    }

  }
  ///////////////////////////////////////////////////// JOB EDIT ///////////////////////////////////////////////////////////////////////
  editJob() {
    if (this.isEditTrue) {
      if (this.model == null) {
        this.alertify.error('Please add Job date....');
        return false;
      }
      if (this.startDate == null) {
        this.alertify.error('Please add start date....');
        return false;
      }
      if (this.endDate == null) {
        this.alertify.error('Please add end date....');
        return false;
      }
      if (!this.isEditTrue) {
        if (this.selectedCustomerId == null) {
          this.alertify.error('Please select customer....');
          return false;
        }
      }

      if (this.jobName == "") {
        this.alertify.error('Please add job name....');
        return false;
      }
      let innerThis = this;
      this.alertify.confirm('Create Invoice', 'Are you sure you want to Edit Job', function () {
        let joibTosave = new Job;
        joibTosave.amount = innerThis.totalAmount;
        joibTosave.squareFeet = innerThis.squareFeet;
        joibTosave.description = "";
        joibTosave.ratePerSquareFeet = innerThis.ratePerSquareFeet;
        joibTosave.customerId = innerThis.selectedCustomerId;
        joibTosave.startDate = innerThis.startDate.formatted;
        joibTosave.endDate = innerThis.endDate.formatted;
        joibTosave.jobDate = innerThis.model.formatted;
        joibTosave.state = 1;
        joibTosave.name = innerThis.jobName;
        joibTosave.itemVOList = innerThis.itemToSave;
        joibTosave.paymentDetailList = innerThis.paymentDetailList;
        joibTosave.jobId = innerThis.selectedJobId;
        joibTosave.jobSquareFeetDetailVOList = innerThis.squareFeelList;
        
        console.log("Edit job Details",joibTosave);
        innerThis.JobService.addNewItems(joibTosave).then((response) => {
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
            innerThis.advance = 0.00;
            innerThis.customerName = '';
            innerThis.customerAddress = '';
            innerThis.customerTelephone = '';
            innerThis.jobName = '';
            innerThis.squareFeet = 0.00;
            innerThis.ratePerSquareFeet = 0.00;

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
            innerThis.balance = Math.round((innerThis.totalInvoiceAmount + Number.EPSILON) * 100) / 100;
            innerThis.advance = 0.00;
            innerThis.cash = 0.00;
            innerThis.paymentDetail.typeCode = 'CH';
            innerThis.isShowCashFild = true;
            innerThis.JobService.getJobList().then(response => {
              innerThis.jobList = response.json().result;
            });
            innerThis.isShow = false;
            innerThis.isEditTrue = false;
            innerThis.selectedJobNumber = '';
            innerThis.squareFeelList = [];

          } else {
            innerThis.spinner.hide();
            innerThis.alertify.error('Create un-successfull');
            innerThis.itemToSave = [];
            innerThis.balance = Math.round((innerThis.totalInvoiceAmount + Number.EPSILON) * 100) / 100;
            innerThis.advance = 0.00;
            innerThis.cash = 0.00;
            innerThis.paymentDetail.typeCode = 'CH';
            innerThis.isShowCashFild = true;

          }
        });
      });
    }

  }

  getBalanceAmount(cash, type) {
    if (cash == "") {
      cash = '0';
      console.log("send data is =====", cash);
    }
    if (type == 1) {
      this.advance = parseFloat(cash.replace(/,/g, ''));
    } else {
      this.cash = parseFloat(cash.replace(/,/g, ''));

    }

    this.totalInvoiceAmount = Math.round((this.totalInvoiceAmount + Number.EPSILON) * 100) / 100;
    console.log("Invoice Amount", this.totalInvoiceAmount);
    this.balance = this.totalInvoiceAmount - (this.cash + this.advance);
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
    this.selectedBankId = -1;
    this.chequeDate = null;
    this.modalReference = this.modalService.open(content, { size: 'lg' });
  }
  closeModalWindow() {
    this.balance = Math.round((this.totalInvoiceAmount + Number.EPSILON) * 100) / 100;
    this.advance = 0.00;
    this.cash = 0.00;
    this.paymentDetail.typeCode = 'CH';
    this.isShowCashFild = true;
    this.modalReference.close();
  }


  setSelectedBank(selectedBankId) {
    console.log("selected Bank is =====", selectedBankId)
    this.selectedBankId = selectedBankId
  }
  addOtherExpenses(id) {
    if (id != -1) {
      console.log("type", typeof id)
      let selectedExpensesType = _.find(this.otherExpenses, { 'id': Number(id) });
      console.log("findItem ===", selectedExpensesType);
      let selectedExpenses = {
        "id": selectedExpensesType.id,
        "name": selectedExpensesType.name,
        "amount": 0.00,
        "date": "",
        "description": ""
      }

      this.addedOtherExpenses.push(selectedExpenses);
      console.log("Expenses", this.addedOtherExpenses);
    } else {
      this.alertify.error('Please Select Expenses');
    }
  }
  clearName() {
    this.selectedCustomer = "";
    this.selectedCustomerId = null;
  }

  getJobDetailsById(id) {
    console.log("Job Id ====", id);
    id = Number(id);
    this.selectedJobId = id;
    if (id != -1) {
      this.isEditTrue = true;
      let selectedJob = _.find(this.jobList, { 'jobId': id });
      this.selectedJobNo = selectedJob.jobNumber;
      this.selectedJobName = selectedJob.name;


      this.JobService.getJobById(id).then(response => {
        this.selectedJob = response.json().result;
        console.log("selectedJob ====", this.selectedJob);
        this.selectedJobNumber = this.selectedJob.jobNumber;
        this.jobName = this.selectedJob.name;
        this.ratePerSquareFeet = this.selectedJob.ratePerSquareFeet;
        this.squareFeet = this.selectedJob.squareFeet;
        let endDate = this.selectedJob.endDate.split("-");
        let startDate = this.selectedJob.startDate.split("-");
        this.savedItemList = this.selectedJob.itemVOList;
        this.squareFeelList = this.selectedJob.jobSquareFeetDetailVOList;
        this.calculateInvoiceAmount();
        _.remove(this.savedItemList, { 'itemId': null });
        this.isShow = true
        this.startDate = {
          date: {
            year: startDate[0],
            month: parseInt(startDate[1]),
            day: parseInt(startDate[2])
          }, formatted: startDate[0] + '-' + parseInt(startDate[1]) + '-' + parseInt(startDate[2])
        };

        this.endDate = {
          date: {
            year: endDate[0],
            month: parseInt(endDate[1]),
            day: parseInt(endDate[2])
          }, formatted: endDate[0] + '-' + parseInt(endDate[1]) + '-' + parseInt(endDate[2])
        };

      })
    } else {
      this.isEditTrue = false;
      this.selectedJobNumber = '';
      this.jobName = '';
      this.ratePerSquareFeet = 0;
      this.squareFeet = 0;
      this.isShow = false;
      this.startDate = {
        date: {
          year: moment().year(),
          month: (moment().month() + 1),
          day: moment().date()
        }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
      };
      this.endDate = {
        date: {
          year: moment().year(),
          month: (moment().month() + 1),
          day: moment().date()
        }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
      };
      this.squareFeelList = [];
      this.calculateInvoiceAmount();
    }
  }
  showItemList() {
    let options: any = {
      size: "lg modal-dialog my-modal",
      container: 'nb-layout',
      class: "xxx",
      style: 'padding: 117px'
    };
    const activeEditModal = this.modalService.open(ItemModalWindowComponent, options);
    activeEditModal.componentInstance.jobNumber = this.selectedJobNumber;
    activeEditModal.componentInstance.itemList = this.savedItemList;

  }
  calculateInvoiceAmount() {
    this.totalInvoiceAmount = 0;
    this.squareFeelList.forEach(object => {
      this.totalInvoiceAmount += object.amount;
    });
    this.totalInvoiceAmount = _.round(this.totalInvoiceAmount, 2);
    console.log("totalInvoiceAmount ===", this.totalInvoiceAmount);

    this.totalInvoiceAmount = Math.round((this.totalInvoiceAmount + Number.EPSILON) * 100) / 100;
    console.log("Invoice Amount", this.totalInvoiceAmount);
    this.balance = this.totalInvoiceAmount - (this.cash + this.advance);

  }
  addSquareFeet() {
    let options: any = {
      size: "lg modal-dialog my-modal",
      container: 'nb-layout',
      class: "xxx",
      style: 'padding: 117px',
      backdrop: 'static',
      keyboard: false
    };
    const activeEditModal = this.modalService.open(SquareFeetComponent, options);
    activeEditModal.componentInstance.jobNumber = this.selectedJobNumber;
    activeEditModal.componentInstance.SquareFeelList = this.squareFeelList;

    activeEditModal.result.then((result) => {
      if (result) {
        this.squareFeelList = result;
        this.calculateInvoiceAmount();
      }
    });

  }

  printInvoice(savedPurchaseOrder, insertObject) {
    var invoiceWindow = window.open("", "print-window");
    //invoiceWindow.document.open();
    for (var x = 0; x < savedPurchaseOrder.itemVOList.length; x++) {
      this.printDetails = this.printDetails + '<tr>' +
        '<td style="height:20px;width:50%;text-align:left;">' + savedPurchaseOrder.itemVOList[x].name + '</td>' +
        '<td style="height:20px;width:11%;text-align:right;">' + savedPurchaseOrder.itemVOList[x].sellingQuantity + '</td>' +
        '<td style="height:20px;width:10%;text-align:right;">' +
        parseFloat(savedPurchaseOrder.itemVOList[x].price.toString()).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td>' +
        '<td style="height:20px;width:15%;text-align:right;">' + parseFloat(savedPurchaseOrder.itemVOList[x].total).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td>' +
        '</tr>'
    }

    invoiceWindow.document.write(
      '<div>' +
      `<table style="width:100%;">
                      <br><br><br><br><br><br><br><br><br><br>
                  
                      <tr style="width:100%; height:50px; text-align:center;"><td >PURCHASE ORDER</td></tr>
                      <tr style="width:100%; height:50px; text-align:center;"><td style="font-size: 40px;">Magnate Enterprises - Makola</td></tr>
                  </table>
  
                  <br/>
                  <br/> 
                  <div class="row">
                    <table  style=" margin-left:2%; width:100%;">
                     <thead>
                      <tr>
                        <th style="text-align:left;height:15px;width:30%;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPO Number :
                        </th>
                        <th style="text-align:left;height:15px;width:20%;  ">`+ insertObject.purchaseCode +
      `</th> 
                        <th style="text-align:left;height:15px;width:20%;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDate :
                        </th>
                        <th style="text-align:left;height:15px;width:30%; ">`+ savedPurchaseOrder.purchaseOrderDate +
      `</th>
                      </tr>
                     </thead>
                    </table>
  
              
                   <table  style=" margin-left:2%; width:100%;">
                    <thead>
                     <tr>
                      <th style="text-align:left;height: 15px; width:30%; ">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSupplier Name :
                      </th>
                      <th style="text-align:left; height: 15px; width:70%;  ">`+ insertObject.supplierName +
      `</th>
                     </tr>  
                    </thead>
  
                   </table>
                  </div> <br/>
                 
  
                  <table  style="margin-left:11%;width:80%;text-align:right;">
                  
                    <tr>
  
                      <th style="text-align:left;width:33%;">Item Name
                      </th>
                      <th style="text-align:right;width:14%;">Quantity
                      </th>
                      <th style="text-align:right;width:15%;">Unit Price
                      </th> 
                      <th style="text-align:right;width:20%;">Amount (Rs)
                      </th>
  
                    </tr>
                  <tbody > `+ this.printDetails + `</tbody>
                  </table> 
  
  
                  <div class="row">
  
                  <table style="margin-left:14%; width:77%;padding-top:50px;">
                   <thead  > <tr>
                   <th style= " text-align:right; height: 20px; width:48%;">Total Amount
                   </th>
                  <th style=" text-align:right;height: 20px; width:24%;">`+ parseFloat(insertObject.totalAmount).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      }) +
      `</th></tr> 
                    <tr>
                     </tr>
                    </thead>
                    <tbody > 
                    </tbody>
                    </table>
                   </div><br/>
                   <div class="row" style="  ">
                  <table  style="margin-left:2%; width:90%;">
                  <thead  >
                  <tr>
                  <th style="text-align:right;height: 20px; width:25%; ">Authorized By :
                  </th>
                  <th style="text-align:left; height: 20px; width:10%;  ">`+ 'Malshanthi' +
      `</th>
                  <th style="text-align:center;height: 20px; width:55%;  ">
                  </th></tr>
                  </thead>
                  </table> 
               </div>
               <div class="row" style="  ">
               <table  style="margin-left:5%; width:90%;">
               <thead>
               <tr>
               <th style="text-align:center;height: 20px; width:90%;  ">Thank You.!
               </th></tr>
               <tr>
               <th style="text-align:center;height: 40px; width:90%;  ">
               </th></tr></thead>
               </table>
               </div>
               <script>
                  setTimeout(function () { window.print(); }, 500);
                </script>
            </div>`



    )
    setTimeout(function () { invoiceWindow.close(); }, 1000);
    this.printDetails = '';
  }

}
