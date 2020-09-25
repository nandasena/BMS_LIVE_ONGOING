
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderService } from '../../../services/purchaseOrder.service';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../services/invoice.service';
import { Item } from '../../../models/item_modal';
import {PurchaseOrderModel} from '../../../models/purchase-order-modal'
import { PaymentModal } from '../../../models/payment-modal';
import { InvoiceModel } from '../../../models/invoice-modal';
import { AlertifyService } from '../../../services/alertify.service';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'purchase-order-create-view',
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.scss']
})
export class PurchaseOrderCreateComponent implements OnInit {

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
  itemToSave: Item[] = [];
  selectedItem;
  totalAmount: number = 0.00;
  totalAmountWithDiscount: number = 0.00
  x: number = 0.00;
  purchaseDate = { date: {}, formatted: '' };
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
  selectedBankId = -1;
  selectedItemId: number;
  supplierList = [];
  branchList = [];
  selectedSupplierName: string = '';
  selectedSupplierId: number= -1;
  selectedSupplier
  showChequeFild: boolean = false;
  showCardFild: boolean = false;
  modalReference: NgbModalRef;
  paymentType = '';
  paymentDetailList: PaymentModal[] = [];
  paymentDetail;
  printDetails: String = '';
  bankList = [];
  selectedBranch: number = -1;





  constructor(private invoiceService: InvoiceService, private alertify: AlertifyService, private spinner: NgxSpinnerService, private el: ElementRef,private purchaseOrderService: PurchaseOrderService) { }

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
    });

    this.invoiceService.getSubCategoryList().then((response) => {
      this.subCategoryList = response.json().result;
    });

    this.invoiceService.getItemList().then((response) => {
      this.itemList = response.json().result;
    });

    this.invoiceService.getSupplierList().then((response) => {
      this.supplierList = response.json().result;
    });
    this.purchaseOrderService.getBranchList().then((response) => {
      this.branchList = response.json().result;
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


  getItemsOfRelevetCategory(id) {
    id = Number(id)
    this.categoryWiseItemList = _.filter(this.itemList, { 'subCategoryId': id });
  }

  addSelectedItemToTable(id, event) {
    id = Number(id)
    if (id == -1) {
      this.alertify.error('Please select item');
      return false
    }
    this.selectedItem = _.find(this.categoryWiseItemList, { 'itemId': id })
    

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
        item.price = this.selectedItem.itemDetailList[0].costPrice;
        item.id = length + 1;
        item.itemId = this.selectedItem.itemId;
        item.discountPercentage = 0;
        item.total = this.selectedItem.itemDetailList[0].costPrice * 1
        this.itemToSave.push(item);
        this.calculateTotal();
      } else {
        let price = foundItem.price
        let qty = foundItem.sellingQuantity;
        foundItem.sellingQuantity++
        foundItem.total = price * (++qty) * _.round(1 - (foundItem.discountPercentage / 100), 4)
        this.itemToSave.push(foundItem);
        this.calculateTotal();
      }
    } else {
      this.alertify.error('Item not here');
    }
 

  }
  selectedItemDetails(itemDetailId) {
    itemDetailId = Number(itemDetailId);
    let foundItem = _.find(this.itemToSave, { 'itemDetailId': itemDetailId })
    _.remove(this.itemToSave, { 'itemDetailId': itemDetailId })
    if (foundItem == null) {
      let length = this.itemToSave.length;
      let selectedDetail = _.find(this.selectedItem.itemDetailList, { 'itemDetailId': itemDetailId })
      if (selectedDetail.availableQuantity >= 1) {
        let item = new Item();
        item.subCategoryId = Number(this.selectedItem.subCategoryId);
        item.name = this.selectedItem.description;
        item.itemDetailId = selectedDetail.itemDetailId;
        item.sellingQuantity = 1
        item.availableQuantity = selectedDetail.availableQuantity;
        item.price = selectedDetail.costPrice;
        item.itemId = this.selectedItem.itemId;
        item.discountPercentage = 0;
        item.total = item.price * item.sellingQuantity
        item.id = length + 1;
        this.itemToSave.push(item);
        this.calculateTotal();
      } else {
        this.alertify.error('Quantity not avalable...');
      }

    } else {
      if (foundItem.availableQuantity > foundItem.sellingQuantity) {
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

    
  }

  // closeModal() {
  //   var modal = document.getElementById("myModal");
  //   modal.style.display = "none";
  // }
  changeQty(itemDetailId, qty, event) {
    this.selectedItemId = itemDetailId;
    if (qty == 0 || qty == null) {
      qty = 1;
    }
    let findItem = _.find(this.itemToSave, { 'itemDetailId': itemDetailId })
    _.remove(this.itemToSave, { 'itemDetailId': itemDetailId })
    let price = findItem.price
    findItem.sellingQuantity++
    findItem.total = price * qty * _.round(1 - (findItem.discountPercentage / 100), 4)
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
    this.totalAmountWithDiscount = 0.00
    this.itemToSave.forEach(item => {
      this.totalAmount += (item.sellingQuantity * item.price * _.round(1 - (item.discountPercentage / 100), 4))
      this.totalAmountWithDiscount += _.round(item.sellingQuantity * item.price, 4)


    });
    this.balance = this.totalAmount;
    this.itemToSave = _.orderBy(this.itemToSave, ['id'], ['desc']);

  }
  
  getBalanceAmount(cash) {
    this.cash = cash;
    this.balance = this.totalAmount - this.cash
  }

  getSubCategory(id) {
    id = Number(id);
    this.selectedSubCategory = _.filter(this.subCategoryList, { 'mainCategoryId': id })
    this.categoryWiseItemList = [];
  }
  setDiscount(discountPer, itemId) {
    let findItem = _.find(this.itemToSave, { 'itemDetailId': itemId })
    _.remove(this.itemToSave, { 'itemDetailId': itemId })
    let price = findItem.price
    let qty = findItem.sellingQuantity;
    findItem.total = price * qty * _.round((1 - (discountPer / 100)), 4)
    findItem.discountPercentage = Number(discountPer);
    this.itemToSave.push(findItem);
    this.calculateTotal();
  }
  addSupplierName(supplierId, event) {
    event.target.value = '';
    this.selectedSupplierId = -1;
    this.selectedSupplierName = '';
    supplierId = Number(supplierId);
    if (supplierId == -1) {
      this.selectedSupplierName = '';
    } else {
      let selectedSupplier = _.find(this.supplierList, { 'supplierId': supplierId });
      if (selectedSupplier != null) {
        this.selectedSupplierName = selectedSupplier.firstName;
        event.target.value = this.selectedSupplierName;
        this.selectedSupplierId = selectedSupplier.supplierId;
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
                item.price = this.selectedItem.itemDetailList[0].costPrice;
                item.id = length + 1;
                item.itemId = this.selectedItem.itemId;
                item.discountPercentage = 0;
                item.total = this.selectedItem.itemDetailList[0].costPrice * 1
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


  addSelectedBranch(selectedBranch) {
    this.selectedBranch = selectedBranch;

  }
  changePrice(id, value, event) {
    let foundItem = _.find(this.itemToSave, { 'itemDetailId': id });
    
    if (value == '') {
      foundItem.price = Number(foundItem.price);
      event.target.value = foundItem.price.toFixed(2);
      this.calculateTotal();

    } else {
      
      value =parseFloat(value.replace(/,/g, ''));
      _.remove(this.itemToSave, { 'itemDetailId': id });
      foundItem.price = Number(value);
      let price = foundItem.price;
      let qty = foundItem.sellingQuantity;
      foundItem.sellingQuantity++
      foundItem.total = price * qty * _.round(1 - (foundItem.discountPercentage / 100), 4)
      foundItem.sellingQuantity++
      foundItem.sellingQuantity = qty;
      this.itemToSave.push(foundItem);
      this.calculateTotal();

    }
  }

  createPurchaseOrder() {
    if(this.itemToSave.length==0){
      this.alertify.error('Please add at least one item to card to Process purchase order');
      return false;
    }
    if(this.selectedBranch==-1){
      this.alertify.error('Please select Branch');
      return false;
    }
    if(this.selectedSupplierId == -1){
      this.alertify.error('Please select Supplier');
      return false;
    }
    if(this.purchaseDate ==null){
      this.alertify.error('Please select date');
      return false;
    }
    console.log("supplier id ======",this.selectedSupplierId);
    let innerThis = this;
    this.alertify.confirm('Create Invoice', 'Are you sure you want to create invoice', function () {
      let purchaseOrder = new PurchaseOrderModel;
      purchaseOrder.totalAmount = innerThis.totalAmount;
      purchaseOrder.itemVOList = innerThis.itemToSave;
      purchaseOrder.supplierId = innerThis.selectedSupplierId;
      purchaseOrder.purchaseOrderDate = innerThis.purchaseDate.formatted;
      purchaseOrder.estimateReceiveDate =innerThis.purchaseDate.formatted;
      purchaseOrder.userId =1;
      purchaseOrder.branchId=Number(innerThis.selectedBranch);

      // console.log("asasssssass",purchaseOrder);
      // return false;
      innerThis.purchaseOrderService.savePurchaseOrder(purchaseOrder).then((response) => {
        innerThis.spinner.show();
        let resultObj = response.json();
        if (resultObj.statusCode == 200 && resultObj.success) {

          innerThis.spinner.hide();
          innerThis.printInvoice(purchaseOrder, resultObj.result);
          innerThis.alertify.success('Create successfull');
          innerThis.itemToSave = [];
          innerThis.totalAmount = 0.00;
          innerThis.balance = 0.00;
          innerThis.selectedSupplier = "";
          innerThis.totalAmountWithDiscount =0.00
          innerThis.invoiceService.getItemList().then((response) => {
            innerThis.itemList = response.json().result;
          });
          innerThis.categoryWiseItemList = [];
          innerThis.selectedSubCategory = [];
          innerThis.mainCategoryList = [];
          innerThis.invoiceService.getMaiCategoryList().then((response) => {
            innerThis.mainCategoryList = response.json().result;
          })



        } else {
          innerThis.spinner.hide();
          innerThis.alertify.error('Create un-successfull');
          innerThis.itemToSave = [];

        }
      })
    });
  }

  printInvoice(savedPurchaseOrder, insertObject) {
    var invoiceWindow = window.open("", "print-window");
    //invoiceWindow.document.open();
    for (var x = 0; x < savedPurchaseOrder.itemVOList.length; x++) {
      this.printDetails = this.printDetails + '<tr><td style="height:20px;width:33%;text-align:left;">' + savedPurchaseOrder.itemVOList[x].name + '</td><td style="height:20px;width:15%;text-align:right;">' +
        parseFloat(savedPurchaseOrder.itemVOList[x].price.toString()).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td><td style="height:20px;width:14%;text-align:right;">' + savedPurchaseOrder.itemVOList[x].sellingQuantity + '</td>' +
        '</td><td style="height:20px;width:18%;text-align:right;">' + parseFloat((savedPurchaseOrder.itemVOList[x].sellingQuantity * savedPurchaseOrder.itemVOList[x].discountPercentage * savedPurchaseOrder.itemVOList[x].price / 100).toString()).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td>' +
        '</td><td style="height:20px;width:20%;text-align:right;">' + parseFloat(savedPurchaseOrder.itemVOList[x].total).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td>' +
        '</tr>'
    }

    invoiceWindow.document.write(
      '<div>' +
      `<table style="width:100%;">
                      <br><br><br><br><br><br><br><br><br><br>
                  
                      <tr style="width:100%; height:50px; text-align:center;"><td >PURCHASE ORDER</td></tr>
                  </table>
  
                  <br/>
                  <br/> 
                  <div class="row">
                    <table  style=" margin-left:2%; width:100%;">
                     <thead>
                      <tr>
                        <th style="text-align:left;height:15px;width:30%;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspInvoice Number :
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
                      <th style="text-align:left;height: 15px; width:30%; ">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspCustomer Name :
                      </th>
                      <th style="text-align:left; height: 15px; width:70%;  ">`+ insertObject.supplierName +
      `</th>
                     </tr>  
                    </thead>
  
                   </table>
                  </div> <br/>
                 
  
                  <table  style="margin-left:11%;width:80%;text-align:right;">
                  
                    <tr>
  
                      <th style="text-align:left;width:33%;">Discription
                      </th>
                      <th style="text-align:right;width:15%;">Unit Price
                      </th> 
                      <th style="text-align:right;width:14%;">Quantity
                      </th>
                      <th style="text-align:right;width:18%;">Discount (Rs)
                      </th>
                      <th style="text-align:right;width:20%;">Amount (Rs)
                      </th>
  
                    </tr>
                  <tbody > `+ this.printDetails + `</tbody>
                  </table> 
  
  
                  <div class="row">
  
                  <table style="margin-left:14%; width:77%;padding-top:50px;">
                   <thead  > <tr>
                   <th style= " text-align:right; height: 20px; width:48%;">Total
                   </th>
                  <th style=" text-align:right;height: 20px; width:24%;">`+ parseFloat(insertObject.totalAmount).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      }) +
      `</th></tr> 
                    <tr>
                    <th style=" text-align:right; height: 20px; width:48%; "> Discount
                    </th>  
                     <th style=" text-align:right;height: 20px; width:22%; ">`+ parseFloat(insertObject.totalDiscount).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      }) +
      `</th> 
                     </tr>
                     <tr>
                     <th style="text-align:right; height: 20px; width:48%; ">Net Total
                     </th> 
                      <th style=" text-align:right;height: 20px; width:22%; ">`+ parseFloat((insertObject.totalAmount - insertObject.totalDiscount).toString()).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      }) +
      `</th>
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
                  <th style="text-align:left; height: 20px; width:10%;  ">`+ 'Pasan' +
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
