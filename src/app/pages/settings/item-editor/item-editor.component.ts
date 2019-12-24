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
      id: {
        title: 'Identifier Code',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      count: {
        title: 'Count',
        type: 'string',
      },
    },
  };
  temp_itemcount: number = 0;
  mainCategoryList = [];
  subCategoryList = [];
  selectedCategory: Category;
  selectedSubCategory: Category;
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
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
              private modalService: NgbModal ,
              private alertifyService: AlertifyService,
              private activeModal: NgbActiveModal,
              private settingsservice: SettingsService) {
    const data = this.service.getUOMList();
    this.source.load(data);
    this.selectedCategory = this.selectedSubCategory = this.initcategory;
  }
  ngOnInit() {

    this.settingsservice.getMainCategoryList().then(response => {
      this.mainCategoryList = response.json().result;
    });
    this.settingsservice.getSubCategoryList().then(response => {
      this.subCategoryList = response.json().result;
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

  closeModal() {
    this.temp_itemcount = 0;
    this.activeModal.close();
  }
}
