import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderService } from '../../../services/purchaseOrder.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

@Component({
    selector: 'purchase-order-create-view',
    templateUrl: './purchase-order-create.component.html',
    styleUrls: ['./purchase-order-create.component.scss']
})
export class PurchaseOrderCreateComponent implements OnInit {

    constructor(private activeModal: NgbActiveModal, private purchaseOrderService: PurchaseOrderService) { }

    ngOnInit() {

    }

    closeModal() {
        this.activeModal.close();
    }

   

}
