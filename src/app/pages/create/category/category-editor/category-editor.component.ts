import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BiguserService } from "../.././../../services/biguser.service";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { SmartTableService } from "../../../../@core/data/smart-table.service";
import { Category } from "../../../../models/category_model";
import { Item } from "../../../../models/item_modal";
import { AlertifyService } from "../.././../../services/alertify.service";
import { SettingsService } from "../.././../../services/settings.service";
import * as _ from "lodash";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "category-editor",
  templateUrl: "./category-editor.component.html",
  styleUrls: ["./category-editor.component.scss"]
})
export class CategoryEditorComponent implements OnInit {
  @Input() selectedTask;
  @Input() rowData;
  category = {
    name: "",
    subCategoryId: "",
    mainCategoryId: ""
  };

  settings = {};

  tablebound(): void {
    if (this.Categorytype === "mainCategory") {
      this.settings = {
        mode: "external",
        hideSubHeader: true,
        actions: {
          position: "right"
        },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>'
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>'
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true
        },
        columns: {
          id: {
            title: "Category Code",
            type: "number"
          },
          name: {
            title: "Name",
            type: "string"
          }
        }
      };
    } else if (this.Categorytype === "subCategory") {
      this.settings = {
        mode: "external",
        hideSubHeader: true,
        actions: {
          position: "right"
        },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>'
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>'
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true
        },
        columns: {
          id: {
            title: "Category Code",
            type: "number"
          },
          mainCategoryName: {
            title: "Main Category",
            type: "string"
          },
          name: {
            title: "Name",
            type: "string"
          }
        }
      };
    }
  }

  mainCategoryList = [];
  Categorytype: string = "";
  mainCategory: boolean = false;
  subCategory: boolean = false;
  itemList = [];
  itemToSave: Category[] = [];
  categoryName: string;
  temp_itemcount: number = 1;
  modalReference: NgbModalRef;
  message: string;
  selectedCategory: Category;

  private initcategory: Category = {
    name: "Select Category",
    categoryName: "",
    mainCategoryName: "",
    subCategoryId: 0,
    mainCategoryId: 0,
    id: 0
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private activeModal: NgbActiveModal,
    private biguserService: BiguserService,
    private service: SmartTableService,
    private alertifyService: AlertifyService,
    private settingsservice: SettingsService,
    private spinner: NgxSpinnerService
  ) {
    this.selectedCategory = this.initcategory;
  }

  ngOnInit() {
    this.checkSectiontoDisplay();
    this.tablebound();
    this.settingsservice.getMainCategoryList().then(response => {
      this.mainCategoryList = response.json().result;
    });
  }

  closeModal() {
    this.temp_itemcount = 0;
    this.activeModal.close();
  }
  saveCategory() {
    if (this.Categorytype === "mainCategory") {
      if (this.itemToSave.length !== 0) {
        this.settingsservice
          .saveMainCategoryList(this.itemToSave)
          .then(response => {
            this.spinner.show();
            let resultObj = response.json();
            if (resultObj.statusCode === 200 && resultObj.success) {
              this.spinner.hide();
              this.alertifyService.success("Create successfull");

              this.settingsservice.getMainCategoryList().then((response) => {
                let init_data = response.json().result;
                this.settingsservice.loadCategoryList(init_data);
                this.closeModal();

              }).catch((ex) => {
                let init_data;
              });
              this.itemToSave = [];
              this.closeModal();
            } else {
              this.spinner.hide();
              this.alertifyService.error("Create un-successfull");
              this.itemToSave = [];
              this.closeModal();
            }
          });
      } else {
        this.alertifyService.warning("Add Category Name");
      }
    } else if (this.Categorytype === "subCategory") {
      if (this.itemToSave.length !== 0) {
        this.settingsservice
          .saveSubCategoryList(this.itemToSave)
          .then(response => {
            this.spinner.show();
            let resultObj = response.json();
            if (resultObj.statusCode === 200 && resultObj.success) {
              this.spinner.hide();
              this.alertifyService.success("Create successfull");
              this.itemToSave = [];
              this.settingsservice.getSubCategoryList().then((response) => {
                let init_data = response.json().result;
                this.settingsservice.loadSubCategoryList(init_data);
                this.closeModal();

              }).catch((ex) => {
                let init_data;
              });
              this.closeModal();
            } else {
              this.spinner.hide();
              this.alertifyService.error("Create un-successfull");
              this.itemToSave = [];
              this.closeModal();
            }
          });
      } else {
        this.alertifyService.warning("Add Sub Category Name");
      }
    }
  }

  Categorydelete(event) {
    _.remove(this.itemToSave, { id: event.data.id });
    this.itemToSave.forEach(function (item, i) {
      item.id = i + 1;
    });
    this.source.load(this.itemToSave);
  }
  // closeModalWindow() {
  //   this.modalReference.close();
  // }

  getSubCategory(category: Category): void {
    this.selectedCategory = category;
  }

  checkSectiontoDisplay() {
    this.Categorytype = String(this.selectedTask.category);
    if (this.Categorytype === "mainCategory") {
      this.mainCategory = true;
      this.subCategory = false;
    } else if (this.Categorytype === "subCategory") {
      this.mainCategory = false;
      this.subCategory = true;
    }
  }

  formValidation(): boolean {
    if (this.selectedCategory.mainCategoryId === 0) {
      this.message = "Please select category";
      return false;
    } else if (
      this.categoryName === undefined ||
      this.categoryName === "" ||
      this.categoryName === null
    ) {
      this.message = "Please enter category name";
      return false;
    }
    return true;
  }

  bindCategoryList() {
    if (this.Categorytype === "mainCategory") {
      if (
        this.categoryName !== undefined &&
        this.categoryName !== "" &&
        this.categoryName != null
      ) {
        this.categoryName.trim;
        let findItem = _.find(this.itemToSave, { 'name': this.categoryName })
        if (findItem != null) {
          this.alertifyService.warning("category name is already added");
          return false;
        }
        this.temp_itemcount =this.itemToSave.length +1;
        const item = new Category();
        item.id = this.temp_itemcount;
        item.name = this.categoryName;
        item.subCategoryId = 0;
        this.itemToSave.push(item);
        this.source.load(this.itemToSave);
      } else {
        this.alertifyService.error("Please enter category name");
      }
      return;
    } else if (this.Categorytype === "subCategory") {
      if (this.formValidation()) {
        this.categoryName.trim;
        if (_.find(this.itemToSave, { 'name': this.categoryName })) {
          this.alertifyService.warning("category name is already taken");
          return;
        }
        this.temp_itemcount =this.itemToSave.length +1;
        const item = new Category();
        item.id = this.temp_itemcount;
        item.name = this.categoryName;
        item.mainCategoryId = this.selectedCategory.mainCategoryId;
        item.mainCategoryName = this.selectedCategory.name;
        this.itemToSave.push(item);
        this.source.load(this.itemToSave);
      } else {
        this.alertifyService.error(this.message);
      }
      return;
    }
  }
}
