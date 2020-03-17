import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderService } from '../../../services/purchaseOrder.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ReceiveModale } from '../../../models/item-received-modal';
import { AlertifyService } from '../../../services/alertify.service';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
@Component({
  selector: 'good-received',
  styleUrls: ['./good-received.component.scss'],
  templateUrl: './good-received.component.html',
})


export class GoodReceived {

  purchaseOrderIdList = [];
  purchaseOrderDetailList = [];
  receivedItemList: ReceiveModale[] = [];
  purchaseDate = { date: {}, formatted: '' };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  constructor(
    private modalService: NgbModal,
    private purchaseOrderService: PurchaseOrderService,
    private router: Router,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.purchaseOrderService.getPurchaseOrderIdList().then(response => {
      this.purchaseOrderIdList = response.json().result;

    })
    this.purchaseDate = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };
  }

  getPurchaseOrderDetail(id) {
    if (id != -1) {
      this.purchaseOrderService.getPurchaseOrderDetailById(id).then(response => {
        this.purchaseOrderDetailList = response.json().result;
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
    _.remove(this.receivedItemList, { 'itemId': id });
    if (typeof isFound === 'undefined') {
      let receiveModale = new ReceiveModale;
      receiveModale.itemId = Item.itemId;
      receiveModale.itemName = Item.itemName;
      receiveModale.orderQty = Item.quantity;
      receiveModale.receivedQty = Item.receivedQuantity;
      receiveModale.receiveQty = 0;
      this.receivedItemList.push(receiveModale);

    } else {
      this.receivedItemList.push(isFound);
    }
  }

  removeItem(id) {
    _.remove(this.receivedItemList, { 'itemId': id });
  }

  changeQty(id, receiveQty,event) {
    let Found = _.findLast(this.receivedItemList, { 'itemId': id });
    if ((Found.orderQty - Found.receivedQty) < Number(receiveQty)) {
      Found.receiveQty = 1;
      _.remove(this.receivedItemList, { 'itemId': id });
      this.receivedItemList.push(Found);
      event.target.value =1;
      this.alertify.error('Entered quantity is more than order quantity');
    } else {
      Found.receiveQty = Number(receiveQty);
      _.remove(this.receivedItemList, { 'itemId': id });
      this.receivedItemList.push(Found);
    }


  }

}