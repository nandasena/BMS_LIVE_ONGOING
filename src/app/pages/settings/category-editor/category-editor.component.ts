import { Component, OnInit ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BiguserService} from '../../../services/biguser.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { Category } from '../../../models/category_model';
import { Item } from '../../../models/item_modal';
import { AlertifyService } from '../../../services/alertify.service';
import { SettingsService } from '../../../services/settings.service';
import * as _ from 'lodash';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit {

  @Input() selectedTask;

  category = {
    name: '',
    subCategoryId: '',
    mainCategoryId: '',
  };

  settings = {

  };

    tablebound(): void {

      if (this.Categorytype === 'mainCategory') {

        this.settings = {
          mode: 'external',
          hideSubHeader: true,
          actions: {
            position: 'right',
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
              title: 'Category Code',
              type: 'number',
            },
            categoryName: {
              title: 'Name',
              type: 'string',
            },
          },
        };





      }else if (this.Categorytype === 'subCategory') {

        this.settings = {
          mode: 'external',
          hideSubHeader: true,
          actions: {
            position: 'right',
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
              title: 'Category Code',
              type: 'number',
            },
            mainCategoryName: {
              title: 'Main Category',
              type: 'string',
            },
            categoryName: {
              title: 'Name',
              type: 'string',
            },
          },
        };
      }


    }


  mainCategoryList = [];
  Categorytype: string = '';
  mainCategory: boolean = false;
  subCategory: boolean = false;
  itemList = [];
  itemToSave: Category[] = [];
  categoryName: string;
  temp_itemcount: number = 0;

  message: string;
  selectedCategory: Category;

  private initcategory: Category = {
  "name": "Select Category",
  "categoryName": "",
  "mainCategoryName": "",
  "subCategoryId": 0,
  "mainCategoryId": 0,
  "id": 0
}



  source: LocalDataSource = new LocalDataSource();

  constructor(private activeModal: NgbActiveModal, private biguserService: BiguserService,
    private service: SmartTableService,
    private alertifyService: AlertifyService,
    private settingsservice: SettingsService)
  {
    this.selectedCategory = this.initcategory;
  }

  ngOnInit() {

    this.checkSectiontoDisplay();
    this.tablebound();
    this.settingsservice.getMainCategoryList().then((response) => {

      this.mainCategoryList = response.json().result;
    })

  }

  closeModal() {
    this.temp_itemcount = 0;
    this.activeModal.close();
  }
  createUser() {

    /*this.biguserService.addUser({
      userName: this.user.email,
      groupCode: 1,
      name: this.user.name,
      email: this.user.email,
      levelCode: this.user.level
    }).then(status =>{
      this.closeModal();
    });*/
  }

  getSubCategory(category: Category): void {

    this.selectedCategory = category;

  }

  checkSectiontoDisplay() {

    this.Categorytype = String(this.selectedTask.category);
    if (this.Categorytype === 'mainCategory') {
      this.mainCategory = true;
      this.subCategory = false;
    }else if (this.Categorytype === 'subCategory') {
      this.mainCategory = false;
      this.subCategory = true;
    }
  }

  formValidation(): boolean {

    if (this.selectedCategory.mainCategoryId === 0) {
      this.message = 'Please select category';
      return false;
    }else if (this.categoryName === undefined || this.categoryName === '' || this.categoryName === null) {
      this.message = 'Please enter category name';
      return false;
    }
    return true

  }

  bindCategoryList() {

    if (this.Categorytype === 'mainCategory') {

        if ( this.categoryName !== undefined && this.categoryName !== '' && this.categoryName != null) {

          this.categoryName.trim;
          if (_.find(this.itemToSave, { 'categoryName': this.categoryName })) {
            this.alertifyService.warning('category name is already taken');
            return;
          }
          const item = new Category();
          item.id = this.temp_itemcount++;
          item.categoryName = this.categoryName;
          this.itemToSave.push(item);
          this.source.load(this.itemToSave);
        }else {
          this.alertifyService.error('Please enter category name');
        }
        return;

    }else if (this.Categorytype === 'subCategory') {

      if (this.formValidation()) {

        this.categoryName.trim;
        if (_.find(this.itemToSave, { 'categoryName': this.categoryName })) {
          this.alertifyService.warning('category name is already taken');
          return;
        }
        const item = new Category();
        item.id = this.temp_itemcount++;
        item.categoryName = this.categoryName;
        item.mainCategoryName = this.selectedCategory.name
        this.itemToSave.push(item);
        this.source.load(this.itemToSave);
      }else {
        this.alertifyService.error(this.message);
      }
      return;
    }

  }

}
