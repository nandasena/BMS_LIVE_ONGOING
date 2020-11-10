import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Category } from "../../../../models/category_model";
import { Item } from "../../../../models/item_modal";
import { AlertifyService } from '../../../../services/alertify.service';
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { SmartTableService } from "../../../../@core/data/smart-table.service";
import { SettingsService } from "../../../../services/settings.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ItemDetail } from '../../../../models/itemDetail_model';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})

export class ItemDetailsComponent implements OnInit {

  @Input() rowData
  costprice:number;
  availableQuantity:number;
  cost:string;
  customerPrice:number;
  fabricatorPrice:number;
  mrpPrice:number;
  itemDetailDate = { date: {}, formatted: '' };
  itemDetailDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: "right"
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {
      itemDetailId: {
        title: 'Identifier Code',
        type: 'number',
      },
      fabricatorPrice: {
        title: 'Fabricator Price',
        type: 'string',
      },
      customerPrice: {
        title: 'Customer price',
        type: 'string',
      },
      availableQuantity: {
        title: 'available Qty',
        type: 'string',
      },
    },
  };

  selectedItemDetail: Category;

  ItemName ="";
  ItemCode = "";
  initItemDetailList = [];
  modalReference: NgbModalRef;

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private service: SmartTableService,
    private modalService: NgbModal ,
    private alertifyService: AlertifyService,
    private activeModal: NgbActiveModal,
    private settingsservice: SettingsService,
  ) {}

  ngOnInit() {

    this.ItemName = this.rowData.itemName;
    this.ItemCode = this.rowData.itemCode;
    this.itemDetailDate = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };

/*    this.rowData.forEach(element => {
      this.initItemDetailList.push(element.itemdetailList)
    });*/

    this.source.load(this.rowData.itemDetailList);


  }

  closeModal() {
    this.activeModal.close();
  }
  saveItems() {
    let itemDetail : ItemDetail = {
      itemDetailId: 0,
      fabricatorPrice: this.fabricatorPrice,
      mrpPrice: this.mrpPrice,
      itemId: this.rowData.itemId,
      customerPrice: this.customerPrice,
      costprice: this.costprice,
      quantity: 0,
      availableQuantity: this.availableQuantity,
      companyId: 1,
      purchaseDate:this.itemDetailDate.formatted,
      isDelete: false,
      itemName: "",
      totalItemAmount: 0,
      totalItemDiscount: 0,
      receivedQuantity: 0,
      brandId:1,
      supplierId:1
    }

    console.log("details is ============",itemDetail);
    this.settingsservice.saveItemDetail(itemDetail).then(response=>{

    })
  }
}
