import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from "../../../../models/category_model";
import { AlertifyService } from "../../../../services/alertify.service";
import { SettingsService } from "../../../../services/settings.service";
import * as _ from 'lodash';
import { ItemBtnComponent } from './item-btn.component';

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

  constructor(private service: SmartTableService, private modalService: NgbModal , private alertifyService: AlertifyService,
    private settingsservice: SettingsService) {
    const data = this.service.getUOMList();
    this.source.load(data);
    this.selectedCategory = this.selectedSubCategory = this.initcategory;
  }

  ngOnInit() {


  }


}
