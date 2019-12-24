import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PurchaseOrderService} from '../../../services/purchaseOrder.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'purchase-order-view',
  templateUrl: './purchase-order-detail-modal-window.component.html',
  styleUrls: ['./purchase-order-detail-modal-window.component.scss']
})
export class PurchaseOrderDetailComponent implements OnInit {
  
  @Input() purchaseOrderId;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    columns: {
      itemId: {
        title: 'Item Id',
        type: 'number',
      },
      itemName: {
        title: 'Item Name',
        type: 'string',
      },
      costPrice: {
        title: 'Item Price',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      totalItemAmount: {
        title: 'Total',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      totalItemDiscount: {
        title: 'Discount',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      receivedQuantity: {
        title: 'Received',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      }
    },
  };
  constructor(private activeModal: NgbActiveModal,private purchaseOrderService:PurchaseOrderService) { }

  ngOnInit() {
      console.log("row data is ========",this.purchaseOrderId);
    this.purchaseOrderService.getPurchaseOrderDetailById(this.purchaseOrderId).then(responce=>{
      this.source.load(responce.json().result);
    })

  }

  
  closeModal() {
    this.activeModal.close();
  }

}
