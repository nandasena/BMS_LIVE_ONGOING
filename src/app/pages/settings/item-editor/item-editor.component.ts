import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BiguserService } from "../../../services/biguser.service";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { SmartTableService } from "../../../@core/data/smart-table.service";
import { Category } from "../../../models/category_model";
import { Item } from "../../../models/item_modal";
import { AlertifyService } from "../../../services/alertify.service";
import { SettingsService } from "../../../services/settings.service";
import * as _ from "lodash";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "item-editor",
  templateUrl: "./item-editor.component.html",
  styleUrls: ["./item-editor.component.scss"]
})
export class ItemEditorComponent implements OnInit {

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
      itemId: {
        title: 'Identifier Code',
        type: 'number',
      },
      itemName: {
        title: 'Name',
        type: 'string',
      },
      categoryName: {
        title: 'categoryName',
        type: 'string',
      },
    },
  };
  temp_itemcount: number = 0;
  mainCategoryList = [];
  subCategoryList = [];
  itemList = [];
  selectedCategory: Category;
  selectedSubCategory: Category;
  changebleSubCategoryList: Category[] = [];
  itemName: string;
  itemCode: string;
  private initcategory: Category = {
    name: "Select Category",
    categoryName: "",
    mainCategoryName: "",
    subCategoryId: 0,
    mainCategoryId: 0,
    id: 0
  };
  modalReference: NgbModalRef;
  itemToSave: Item[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService,
    private activeModal: NgbActiveModal,
    private settingsservice: SettingsService,
    private spinner: NgxSpinnerService) {

    this.selectedCategory = this.selectedSubCategory = this.initcategory;
  }
  ngOnInit() {

    this.settingsservice.getMainCategoryList().then(response => {
      this.mainCategoryList = response.json().result;
    });
    this.settingsservice.getSubCategoryList().then(response => {
      this.subCategoryList = response.json().result;
    });
    this.settingsservice.getItemList().then(response => {
      this.itemList = response.json().result;
    });
  }

  onChangeMainCategory(category: Category): void {
    this.selectedCategory = category;
    this.changebleSubCategoryList = _.filter(this.subCategoryList, ['mainCategoryId', this.selectedCategory.mainCategoryId]);
    if (!this.changebleSubCategoryList.length) {
      this.changebleSubCategoryList = [];
      this.selectedSubCategory = this.initcategory;
    }
  }

  onChangeSubCategory(category: Category): void {
    this.selectedSubCategory = category;
  }
  bindItemList() {
    if (!this.validation()) {
      return;
    }
    else {
      let length = this.itemToSave.length;
      const item = new Item();
      item.itemId = ++length;
      item.itemName = this.itemName.trim();
      item.itemCode = this.itemCode.trim();
      item.subCategoryId = this.selectedSubCategory.subCategoryId;
      item.categoryName = this.selectedSubCategory.name;
      this.itemToSave.push(item);
      this.source.load(this.itemToSave);
    }


  }
  saveItems() {
    if (this.itemToSave.length !== 0) {
      console.log("this.itemToSave", this.itemToSave);
      let innerThis = this;
      this.alertifyService.confirm('Create Invoice', 'Are you sure you want to create invoice', function () {
        innerThis.settingsservice.saveItemList(innerThis.itemToSave).then(response => {
          innerThis.spinner.show();
          let resultObj = response.json();
          if (resultObj.statusCode === 200 && resultObj.success) {
            innerThis.spinner.hide();
            innerThis.alertifyService.success("Create successfull");
            innerThis.itemToSave = [];
            innerThis.closeModalWindow();
          } else {
            innerThis.spinner.hide();
            innerThis.alertifyService.error("Create un-successfull");
            innerThis.itemToSave = [];
            innerThis.closeModalWindow();
          }
        });

      });

    } else {
      this.alertifyService.error("Please add at lease one item");
    }

  }

  closeModalWindow() {
    // this.modalReference.close();
    this.activeModal.close();
  }
  validation(): boolean {
    let founfItem = null;
    let newfoundItem =null;
    if(this.itemCode != null || this.itemCode != undefined){
      founfItem = _.find(this.itemList, { 'itemCode': this.itemCode.trim() });
      newfoundItem = _.find(this.itemToSave, { 'itemCode': this.itemCode.trim() });    
    }
    if (this.selectedCategory === undefined || this.selectedCategory === null
      || this.selectedCategory.name === 'Select Category') {
      this.alertifyService.error("Please select the category ");
      return false;

    } else if (this.selectedSubCategory === undefined || this.selectedSubCategory === null
      || this.selectedSubCategory.name === 'Select Category') {
      this.alertifyService.error("Please select the  sub category");
      return false;
    } else if (this.itemName === null || this.itemName === undefined || this.itemName.trim() === '') {
      this.alertifyService.error("Please enter item name");
      return false;
    } else if (this.itemCode === null || this.itemCode === undefined || this.itemCode.trim() === '') {
      this.alertifyService.error("Please enter item code");
      return false;
    } else if (founfItem !=null || newfoundItem!=null) {
      this.alertifyService.error("Item Code is duplicate");
      return false;
    }
    return true;
  }
  closeModal() {
    this.temp_itemcount = 0;
    this.activeModal.close();
  }
  saveCategory() {

  }

  bindCategoryList() {

  }
  removeItem(selectedRow) {
    _.remove(this.itemToSave, { 'itemId': selectedRow });
    this.itemToSave.forEach((item, index) => {
      item.itemId = index + 1;
    });
    this.source.load(this.itemToSave);
  }
}
