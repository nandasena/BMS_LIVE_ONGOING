import { Component } from '@angular/core';
import { NgbModal ,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderService } from '../../../services/purchaseOrder.service';
import { CustomerSupplierService } from '../../../services/customer-supplier.service';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ReceiveModale } from '../../../models/item-received-modal';
import { GoodReceivedModal } from '../../../models/good-received-modal';
import { AlertifyService } from '../../../services/alertify.service';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
import { from } from 'rxjs/observable/from';
import { PaymentModal } from '../../../models/payment-modal';
@Component({
  selector: 'good-received',
  styleUrls: ['./good-received.component.scss'],
  templateUrl: './good-received.component.html',
})


export class GoodReceived {

  purchaseOrderIdList = [];
  supplierWisePurchaseOrder =[];
  supplierList = [];
  purchaseOrderId: number;
  purchaseOrderDetailList = [];
  receivedItemList: ReceiveModale[] = [];
  purchaseDate = { date: {}, formatted: '' };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  goodReceivedModal = new GoodReceivedModal;
  // /////////////////////////////////////////////////////

  selectedBankId=-1;
  chequeDate=null;
  paymentDate;
  invoiceAmount: number = 0.00;
  balance: number = 0.00;
  cash: number = 0.00;
  totalAmount: number = 0.00;
  showChequeFild: boolean = false;
  showCardFild: boolean = false;
  modalReference: NgbModalRef;
  paymentType = '';
  paymentDetailList: PaymentModal[] = [];
  paymentDetail = new PaymentModal();;
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


  constructor(
    private modalService: NgbModal,
    private purchaseOrderService: PurchaseOrderService,
    private customerSupplierService: CustomerSupplierService,
    private router: Router,
    private alertify: AlertifyService,
    private invoiceService :InvoiceService
  ) { 

    this.paymentDate ={
      "date": {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date()
      },
      formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    }
  }

  ngOnInit() {
    this.selectPaymentType('CH');
    this.customerSupplierService.getSupplierList().then(response => {
      this.supplierList = response.json().result;
    })

    this.purchaseOrderService.getPurchaseOrderIdList().then(response => {
      this.purchaseOrderIdList = response.json().result;
    });

    this.purchaseDate = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };

    

    this.invoiceService.getBankList().then((responce) => {
      let result = responce.json();
      if (result.success) {
        this.bankList = result.result
      }

    });

  }

  getPurchaseOrderDetail(id) {
    if (id != -1) {
      this.purchaseOrderId = id;
      this.purchaseOrderService.getPurchaseOrderDetailById(id).then(response => {
        this.purchaseOrderDetailList = response.json().result;
        console.log("purchase Order details ========", this.purchaseOrderDetailList);
      })
      this.receivedItemList = [];
    } else {
      this.purchaseOrderDetailList = [];
      this.receivedItemList = [];
    }

  }
  addItem(id) {
    let Item = _.find(this.purchaseOrderDetailList, { 'itemId': id });
    let isFound = _.find(this.receivedItemList, { 'itemId': id });
    console.log("item details is ====", Item);
    _.remove(this.receivedItemList, { 'itemId': id });
    if (typeof isFound === 'undefined') {
      if (Item.quantity > Item.receivedQuantity) {
        let receiveModale = new ReceiveModale;
        receiveModale.itemId = Item.itemId;
        receiveModale.itemDetailId = Item.itemDetailId;
        receiveModale.itemName = Item.itemName;
        receiveModale.orderQty = Item.quantity;
        receiveModale.receivedQty = Item.receivedQuantity;
        receiveModale.costPrice = Item.costPrice;
        receiveModale.receiveQuantity = 0;
        this.receivedItemList.push(receiveModale);
      } else {
        this.alertify.error('All item is received');
      }
    } else {
      this.receivedItemList.push(isFound);
    }
  }

  removeItem(id) {
    _.remove(this.receivedItemList, { 'itemId': id });
    this.calculate();
  }

  changeQty(id, receiveQty, event) {
    let Found = _.findLast(this.receivedItemList, { 'itemId': id });
    if ((Found.orderQty - Found.receivedQty) < Number(receiveQty)) {
      Found.receiveQuantity = 1;
      _.remove(this.receivedItemList, { 'itemId': id });
      this.receivedItemList.push(Found);
      event.target.value = 1;
      this.alertify.error('Entered quantity is more than order quantity');
    } else {
      Found.receiveQuantity = Number(receiveQty);
      _.remove(this.receivedItemList, { 'itemId': id });
      this.receivedItemList.push(Found);
      this.calculate();
    }
  }
  // calculate(){
  //   this.totalAmount =0.00;
  //   this.receivedItemList.forEach(item => {
  //     this.totalAmount += item.receiveQuantity * item.costPrice;
  //     this.balance =this.totalAmount;
  //   });
  //   this.balance =this.totalAmount;
  //   console.log("aasaasaa",this.totalAmount);
  // }
  calculate(){
    this.totalAmount =0.00;
    this.receivedItemList.forEach(item => {
      const test = Math.pow(10,2);
      this.totalAmount += Number(Math.round(Number((item.receiveQuantity * item.costPrice) + "e" + 2)) + "e-" + 2);
      this.balance = Number(Math.round(Number((this.totalAmount) + "e" + 2)) + "e-" + 2);
    });
    this.balance = Number(Math.round(Number((this.totalAmount) + "e" + 2)) + "e-" + 2);;
    console.log("total amount",this.balance);
  }

  // saveRecevedQuantity() {
  //   if (typeof this.receivedItemList === 'undefined') {
  //   } else {
  //     this.goodReceivedModal.itemDetailsVOList = this.receivedItemList
  //     this.goodReceivedModal.purchaseOrderId = this.purchaseOrderId;
  //     this.goodReceivedModal.receivedDate = this.purchaseDate.formatted;
  //     this.purchaseOrderService.saveGoodReceived(this.goodReceivedModal).then(response => {
  //       if (response.json().statusCode == 200) {
  //         this.purchaseOrderService.getPurchaseOrderDetailById(this.purchaseOrderId).then(response => {
  //           this.purchaseOrderDetailList = response.json().result;
  //         })
  //         this.receivedItemList = [];
  //       }

  //     })
  //   }

  // }

  findPurchaseOrderOfSupplier(supplierId){
    this.supplierWisePurchaseOrder = _.filter(this.purchaseOrderIdList,{'supplierId': Number(supplierId)});
  }



// ---------------------------------------------------------------------------------


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

  closeModalWindow() {
    this.balance = this.totalAmount;
    this.cash = 0.00;
    this.paymentDetail.typeCode = 'CH';
    this.isShowCashFild = true;
    this.modalReference.close();
  }

  getBalanceAmount(cash) {
    this.cash = parseFloat(cash.replace(/,/g, ''));
    this.balance = Number(Math.round(Number((this.totalAmount) + "e" + 2)) + "e-" + 2) - Number(Math.round(Number((this.cash) + "e" + 2)) + "e-" + 2);
  }

  setSelectedBank(selectedBankId) {
    this.selectedBankId =selectedBankId
  }
  openModalWindow(content) {
    if (this.receivedItemList.length != 0) {
      let returnValue = true;
      this.receivedItemList.forEach(item => {
        if (item.receiveQuantity == 0) {
          returnValue = false;
        }

      });
      if (returnValue != true) {
        this.alertify.error('You can not add zero quantity....');
        return false;
      }

      if(this.purchaseDate ==null){
        this.alertify.error('Please add good reveived date....');
        return false;
      }

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

  }



  saveRecevedQuantity() {

    if (this.receivedItemList.length != 0 && this.totalAmount !=0) {

     if (this.paymentDetail.typeCode != 'CR') {
        if (this.balance > 0) {
          this.alertify.error('Balance amount more than total amount ....');
          return false;
        }
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
      }
      if (this.showCardFild) {
        if (this.carsRefNo == "") {
          this.alertify.error('Please add ref number....');
          return false;
        }

      }
      if(this.purchaseDate ==null){
        this.alertify.error('Please add good reveived date....');
        return false;
      }
      if (this.paymentDetail.typeCode == 'CR') {
        
      }

      let innerThis = this;
      this.paymentDetailList.pop();
      this.paymentDetail.amount = this.totalAmount;
      this.chequeNo == '' ? this.paymentDetail.chequeNumber = null : this.paymentDetail.chequeNumber = this.chequeNo;
      this.carsRefNo == "" ? this.paymentDetail.cardNumber = null : this.paymentDetail.cardNumber = this.carsRefNo;
      this.chequeDescription=='' ? this.paymentDetail.description=null: this.paymentDetail.description = this.chequeDescription;
      this.selectedBankId == -1 ? this.paymentDetail.bankId =null : this.paymentDetail.bankId =this.selectedBankId;
      this.paymentDetail.chequeDate = this.chequeDate==null?null:this.chequeDate.formatted;

      this.paymentDetailList.push(this.paymentDetail);

      this.goodReceivedModal.itemDetailsVOList = this.receivedItemList
      this.goodReceivedModal.purchaseOrderId = this.purchaseOrderId;
      this.goodReceivedModal.receivedDate = this.purchaseDate.formatted;
      this.goodReceivedModal.paymentDetailsList = this.paymentDetailList;
      this.alertify.confirm('Create Invoice', 'Are you sure you want to create purchase order', function () {
        innerThis.purchaseOrderService.saveGoodReceived(innerThis.goodReceivedModal).then(response => {
          if (response.json().statusCode == 200) {
            innerThis.purchaseOrderService.getPurchaseOrderDetailById(innerThis.purchaseOrderId).then(response => {
              innerThis.purchaseOrderDetailList = response.json().result;
            })
            innerThis.receivedItemList = [];
            innerThis.paymentDetailList = [];
            innerThis.closeModalWindow();
            innerThis.alertify.success('Create successfull');
          }else{
            innerThis.closeModalWindow();
            innerThis.alertify.error('Create un-successfull');
          }
  
        });
      });
  





      // this.alertify.confirm('Create Invoice', 'Are you sure you want to create invoice', function () {
      //   let invoiceTosave = new InvoiceModel;
      //   invoiceTosave.totalAmount = innerThis.totalAmount;
      //   invoiceTosave.itemList = innerThis.itemToSave;
      //   invoiceTosave.balanceAmount = 0.00;
      //   invoiceTosave.customerName = innerThis.selectedCustomerName;
      //   invoiceTosave.customerId = innerThis.selectedCustomerId;
      //   invoiceTosave.paymentDetailList = innerThis.paymentDetailList;

      //   invoiceTosave.invoiceDate = innerThis.model.formatted;
      //   innerThis.invoiceService.saveInvoice(invoiceTosave).then((response) => {
      //     innerThis.spinner.show();
      //     let resultObj = response.json();
      //     if (resultObj.statusCode == 200 && resultObj.success) {

      //       innerThis.spinner.hide();
      //       innerThis.printInvoice(invoiceTosave, resultObj.result);
      //       innerThis.alertify.success('Create successfull');
      //       innerThis.itemToSave = [];
      //       innerThis.totalAmount = 0.00;
      //       innerThis.balance = 0.00;
      //       innerThis.cash = 0.00;
      //       innerThis.selectedCustomer = ""
      //       innerThis.invoiceService.getItemList().then((response) => {
      //         innerThis.itemList = response.json().result;
      //       });
      //       innerThis.categoryWiseItemList = [];
      //       innerThis.selectedSubCategory = [];
      //       innerThis.mainCategoryList = [];
      //       innerThis.invoiceService.getMaiCategoryList().then((response) => {
      //         innerThis.mainCategoryList = response.json().result;
      //       })
      //       innerThis.closeModalWindow();


      //     } else {
      //       innerThis.spinner.hide();
      //       innerThis.alertify.error('Create un-successfull');
      //       innerThis.itemToSave = [];
      //       innerThis.closeModalWindow();

      //     }
      //   })
      // });

    } else {
      this.alertify.error('Please add item....');
    }

  }

}