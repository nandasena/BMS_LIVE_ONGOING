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
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})

export class ItemDetailsComponent implements OnInit {

  @Input() rowData
  costprice:number =0;
  availableQuantity:number;
  cost:string;
  customerPrice:number =0;
  fabricatorPrice:number =0;
  mrpPrice:number =0;
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
  itemId;
  initItemDetailList = [];
  modalReference: NgbModalRef;

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private service: SmartTableService,
    private modalService: NgbModal ,
    private alertifyService: AlertifyService,
    private activeModal: NgbActiveModal,
    private settingsservice: SettingsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {

    this.ItemName = this.rowData.itemName;
    this.ItemCode = this.rowData.itemCode;
    this.itemId =this.rowData.itemId;
    this.itemDetailDate = {
      date: {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date()
      }, formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    };
    this.settingsservice.getItemDetailsById(this.itemId).then(response => {
      let resultObj = response.json();
      if (resultObj.statusCode === 200 && resultObj.success) {
        this.source.load(resultObj.result);
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  saveItems() {
    this.costprice =Number(String(this.costprice).replace(/\,/g,''));
    this.customerPrice =Number(String(this.customerPrice).replace(/\,/g,''));
    this.fabricatorPrice =Number(String(this.fabricatorPrice).replace(/\,/g,''));
    this.mrpPrice =Number(String(this.mrpPrice).replace(/\,/g,''));

    if (this.availableQuantity === undefined ) {
      this.alertifyService.warning("Please add quantity");
      return false;
    }
    if (this.costprice ==0) {
      console.log("Please add cost ==",this.costprice)
      this.alertifyService.warning("Please add cost.");
      return false;
    }
    if (this.customerPrice == 0) {
      this.alertifyService.warning("Please add customer price.");
      return false;
    }

    if (this.fabricatorPrice == 0) {
      this.alertifyService.warning("Please add fabricator price.");
      return false;
    }
    if (this.mrpPrice == 0) {
      this.alertifyService.warning("Please add MRP price.");
      return false;
    }
    if (this.rowData.itemId == null) {
      this.alertifyService.warning("Item id is null.");
      return false;
    }

    if (this.itemDetailDate ==null ) {
      this.alertifyService.warning("Please add date.");
      return false;
    }
  

    let itemDetail : ItemDetail = {
      itemDetailId: 0,
      fabricatorPrice: this.fabricatorPrice,
      mrpPrice: this.mrpPrice,
      itemId: this.rowData.itemId,
      customerPrice: this.customerPrice,
      costPrice: this.costprice,
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
    // console.log("details is ============",itemDetail);
    let innerThis =this;
    this.alertifyService.confirm('Create New Item Detail', 'Are you sure you want to create Item Detail', function () {
      innerThis.spinner.show();
      innerThis.settingsservice.saveItemDetail(itemDetail).then(response=>{
        let resultObj = response.json();
        if (resultObj.statusCode === 200 && resultObj.success) {
          innerThis.spinner.hide();
          innerThis.alertifyService.success("Create successfull");
          innerThis.mrpPrice =0;
          innerThis.customerPrice = 0;
          innerThis.costprice =0;
          innerThis.availableQuantity =0;
          innerThis.closeModal();
        } else {
          innerThis.spinner.hide();
          innerThis.alertifyService.error("Create un-successfull");
          innerThis.closeModal();
        }

      });
    });
    
  }
}
