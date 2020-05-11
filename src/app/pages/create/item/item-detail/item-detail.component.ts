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

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})

export class ItemDetailsComponent implements OnInit {

  @Input() rowData

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

  private initItemDetail: ItemDetail = {
    itemDetailId: 0,
    fabricatorPrice: 0,
    mrpPrice: 0,
    itemId: 0,
    customerPrice: 0,
    costprice: 0,
    quantity: 0,
    availableQuantity: 0,
    companyId: 0,
    purchaseData: (new Date()),
    isDelete: false,
    itemName: "",
    totalItemAmount: 0,
    totalItemDiscount: 0,
    receivedQuantity: 0,
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

/*    this.rowData.forEach(element => {
      this.initItemDetailList.push(element.itemdetailList)
    });*/

    this.source.load(this.rowData.itemDetailList);


  }

  closeModal() {
    this.activeModal.close();
  }
  saveItems() {

  }
}