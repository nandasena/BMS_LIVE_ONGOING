import { Component, OnInit,Input} from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  @Input() itemList;
  @Input() jobNumber
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
    pager: {
      display: true,
      perPage: 15
    },
    columns: {
      expensesType: {
        title: 'Exepense Type',
        type: 'number',
      },
      itemName: {
        title: 'Item Name',
        type: 'string',
      },
      sellingQuantity: {
        title: 'Quantity',
        type: 'string',
        
      },

      price: {
        title: 'Item Price',
        type:'html',
        valuePrepareFunction: function(value){ return '<div class="customformat"> ' + Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value) + ' </div>' }
      },
      total: {
        title: 'Total',
        type:'html',
        valuePrepareFunction: function(value){ return '<div class="customformat"> ' + Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value) + ' </div>' }
      },
    receivedQuantity: {
        title: 'Received QY',
        type: 'html',
        valuePrepareFunction: function(value){ return '<div class="customformat"> ' + value + ' </div>' }
      },
    },
  };
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    
      this.source.load(this.itemList);
   

  }
  closeModal() {
    this.activeModal.close();
  }

}



// this.settings.columns["title"] = { "title": this.settings.columns["title"].title, type:'html',valuePrepareFunction: function(value){
//   return '<div class="customformat"> ' + value + ' </div>' 
// }};
