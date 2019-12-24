import { IMyDpOptions } from 'mydatepicker';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { PurchaseOrderService } from '../../services/purchaseOrder.service';
import { AlertifyService } from '../../services/alertify.service';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PurchaseOrderDetailComponent} from './purchase-order-detail-modal-window/purchase-order-detail-modal-window.component'

@Component({
    template: `
      <div style="text-align: center;" (click)="onExpand()"><i class="fa fa-arrows-alt fa-2" style="padding-top: 2px;font-size: 18px;" aria-hidden="true"></i></div>
    `,
  })



export class PurchaseOrderDetailButtonComponent implements OnInit {

  @Input() rowData;

      constructor(private service: SmartTableService, private modalService: NgbModal, private purchaseOrderService: PurchaseOrderService, private alertify: AlertifyService) {}

      ngOnInit() {
      }

      onEdit(): void {

      }
      onExpand(){
        const activeEditModal = this.modalService.open(PurchaseOrderDetailComponent, { size: 'lg', container: 'nb-layout' });
         activeEditModal.componentInstance.purchaseOrderId = this.rowData.purchaseOrderId;
        
      }

}