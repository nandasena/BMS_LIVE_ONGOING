import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentDetailService} from '../../../services/paymentDetail.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import {ChequeClearStatusComponent}from './cheque-clear-status.component'

@Component({
  selector: 'credit-payment-detail-modal-window',
  templateUrl: './credit-payment-detail-modal-window.component.html',
  styleUrls: ['./credit-payment-detail-modal-window.component.scss']
})
export class CreditPaymentDetailModalWindowComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,private  paymentDetailService: PaymentDetailService) { }
  
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
      cardNumber: {
        title: 'Card No',
        type:'string',
      },
      chequeNumber: {
        title: 'Cheque No',
        type: 'string',
      },
      chequeDate: {
        title: 'Cheque Date',
        type:'string'
      },
      bankName: {
        title: 'Bank Name',
        type:'string'
      },
      isClear:{
        title: '',
        type:'custom',
        renderComponent:ChequeClearStatusComponent
      },
    },
  };
  

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
