import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'square-feet',
  templateUrl: './square-feet.component.html',
  styleUrls: ['./square-feet.component.scss']
})
export class SquareFeetComponent implements OnInit {
  @Input() jobNumber;
  source: LocalDataSource = new LocalDataSource();
  ratePerSquareFeet="";
  squareFeet="";
  description="";
  squareFeelList=[];
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
      description: {
        title: 'Description',
        type: 'number',
      },
      ratePerSquareFeet: {
        title: 'Rate',
        type: 'string',
      },
      squareFeet: {
        title: 'Square Feet',
        type: 'string',
      },
      amount: {
        title: 'Amount',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      }
    },
  };

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close(this.squareFeelList);
  }
  addSquareFeet(){
   let squareFeetObject = {
     "description":this.description,
     "ratePerSquareFeet":this.ratePerSquareFeet,
     "squareFeet":this.squareFeet
   };
   this.squareFeelList.push(squareFeetObject);
    console.log("ADD======",this.squareFeelList)
    this.description="";
    this.ratePerSquareFeet="";
    this.squareFeet="";

    this.source.load(this.squareFeelList);
  }
 

}
