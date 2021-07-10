import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { AlertifyService } from '../../../../services/alertify.service';
import * as _ from 'lodash';

@Component({
  selector: 'square-feet',
  templateUrl: './square-feet.component.html',
  styleUrls: ['./square-feet.component.scss']
})
export class SquareFeetComponent implements OnInit {
  @Input() jobNumber;
  @Input() SquareFeelList;
  source: LocalDataSource = new LocalDataSource();
  ratePerSquareFeet="";
  squareFeet="";
  description="";
  squareFeelList=[];
  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: 'right',
      edit: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id:{
        title: 'Id',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
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
    private alertifyService:AlertifyService
  ) { }

  ngOnInit() {
    this.squareFeelList = this.SquareFeelList;
    this.source.load(this.squareFeelList);
  }
  closeModal() {
    this.activeModal.close(this.squareFeelList);
  }
  addSquareFeet(){
    if(this.description==""){
      this.alertifyService.error("Description can not be emty");
      return false;
    }
    if(this.ratePerSquareFeet ==""){
      this.alertifyService.error("Rate can not be emty");
      return false;
    }

    if(this.squareFeet ==""){
      this.alertifyService.error("Square feet can not be emty");
      return false;
    }
   let length =this.squareFeelList.length;
   let squareFeetObject = {
     "description":this.description,
     "ratePerSquareFeet":this.ratePerSquareFeet,
     "squareFeet":this.squareFeet,
     "amount":Number(this.ratePerSquareFeet) * Number(this.squareFeet),
     "id":length+1
   };
   this.squareFeelList.push(squareFeetObject);
    this.description="";
    this.ratePerSquareFeet="";
    this.squareFeet="";

    this.source.load(this.squareFeelList);
  }

  RemoveAddedSquareFeet(selectedRow){
    _.remove(this.squareFeelList, { 'id': selectedRow.id})
    this.squareFeelList.forEach((object, index) => {
      object.id =index+1
  });
  this.source.load(this.squareFeelList);

  }


 

}
