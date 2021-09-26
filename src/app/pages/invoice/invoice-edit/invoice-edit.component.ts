import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../services/invoice.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { QuotationService } from '../../../services/quotation.service';

@Component({
  selector: 'invoice-view',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
  @Input() invoiceId;
  @Input() invoiceNumber;
  @Input() type;
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
      mrpPrice: {
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
      }
    },
  };
  constructor(private activeModal: NgbActiveModal,private invoiceService:InvoiceService,private quotationService: QuotationService) { }

  ngOnInit() {
    if(this.type ==='invoice'){
      this.invoiceService.getInvoiceDetailByInvoiceId(this.invoiceId).then(responce=>{
        this.source.load(responce.json().result);
      })
    } else if(this.type ==='quotation'){

      this.quotationService.getQuotationDetailsById(this.invoiceId).then(responce=>{
        this.source.load(responce.json().result);
      })
    }


  }
  closeModal() {
    this.activeModal.close();
  }

}
