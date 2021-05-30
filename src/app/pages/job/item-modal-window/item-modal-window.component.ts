import { Component, OnInit,Input } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'item-modal-window',
  templateUrl: './item-modal-window.component.html',
  styleUrls: ['./item-modal-window.component.scss']
})
export class ItemModalWindowComponent implements OnInit {

  @Input() jobNumber;
  @Input() itemList;
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
      price: {
        title: 'Item Price',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      sellingQuantity: {
        title: 'Quantity',
        type: 'string',
      },
      total: {
        title: 'Total',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      totalItemDiscount: {
        title: 'Discount',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      }
    },
  };
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    // this.invoiceService.getInvoiceDetailByInvoiceId(this.invoiceId).then(responce=>{
    //   this.source.load(responce.json().result);
    // })
    console.log("Item List",this.itemList)
    this.source.load(this.itemList);

  }

  
  closeModal() {
    this.activeModal.close();
  }

}
