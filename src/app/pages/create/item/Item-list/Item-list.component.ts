import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from "../../../../models/category_model";
import { AlertifyService } from "../../../../services/alertify.service";
import { SettingsService } from "../../../../services/settings.service";
import * as _ from 'lodash';
import { ItemBtnComponent } from './item-btn.component';
import { Item } from '../../../../models/item_modal';
import { ItemDetail } from '../../../../models/itemDetail_model';

@Component({
  selector: 'Item-list',
  templateUrl: './Item-list.component.html',
  styleUrls: ['./Item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: "right"
    },
    add: {
      addButtonContent: '<i class=""></i>',
      createButtonContent: '<i class=""></i>',
      cancelButtonContent: '<i class=""></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {
      itemCode: {
        title: 'Item Code',
        type: 'number',
      },
      itemName: {
        title: 'Item Name',
        type: 'string',
      },
      subCategoryId: {
        title: 'sub Category',
        type: 'number',
      },
      button: {
        title: '',
        type: 'custom',
        renderComponent: ItemBtnComponent,
      },
    },
  };

  mainCategoryList = [];
  subCategoryList = [];
  selectedCategory: Category;
  selectedSubCategory: Category;
  selectedItemDetail: Item;
  changebleSubCategoryList: Category[] = [];
  categoryName: string;
  private initcategory: Category = {
    name: "Select Category",
    categoryName: "",
    mainCategoryName: "",
    subCategoryId: 0,
    mainCategoryId: 0,
    id: 0
  };

  private initItem: Item = {
    itemId: 0 ,
    itemDetailId:  0,
    sellingQuantity: 0 ,
    itemName:  "",
    description: "",
    categoryName: "",
    subCategoryId: 0,
    SellingQuantity: 0,
    price: 0,
    itemDiscount: 0,
    total: 0,
    itemCode: "",
    orderQuantity: 0,
    discountPercentage: 0,
    id:0,
    name:'',
    availableQuantity:0,
    cost:0,
    fabricatorPrice:0,
    itemdetailList: new ItemDetail(),
  };
  initItem_data = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private modalService: NgbModal , private alertifyService: AlertifyService,
    private settingsservice: SettingsService) {


     this.settingsservice.getItemList().then((response) => {
      this.initItem_data = response.json().result;

      this.source.load(this.initItem_data);
    }).catch((ex) => {
       this.initItem_data;
    });
    this.selectedCategory = this.selectedSubCategory = this.initcategory;
  }

  ngOnInit() {


  }


}
