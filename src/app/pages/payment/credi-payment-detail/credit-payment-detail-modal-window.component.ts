import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentDetailService} from '../../../services/paymentDetail.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'credit-payment-detail-modal-window',
  templateUrl: './credit-payment-detail-modal-window.component.html',
  styleUrls: ['./credit-payment-detail-modal-window.component.scss']
})
export class CreditPaymentDetailModalWindowComponent implements OnInit {

   
  
  @Input() paymentDetailId;
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
        paymentDate: {
        title: 'Payment Date',
        type: 'number',
      },
      paymentType: {
        title: 'Type',
        type: 'string',
      },
      paidAmount: {
        title: 'Amount',
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
  constructor(private activeModal: NgbActiveModal,private  paymentDetailService: PaymentDetailService) { }

  ngOnInit() {
      console.log("row data is ========",this.paymentDetailId);
    this.paymentDetailService.getCreditPaymentDetailsById(this.paymentDetailId).then(responce=>{
      this.source.load(responce.json().result);
    })

  }
  
  closeModal() {
    this.activeModal.close();
  }

}
