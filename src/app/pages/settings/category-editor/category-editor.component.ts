import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BiguserService} from '../../../services/biguser.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { Category } from '../../../models/category_model';
import { Item } from '../../../models/item_modal';
import { AlertifyService } from '../../../services/alertify.service';
import * as _ from 'lodash';

@Component({
  selector: 'invite-user',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit {
  category = {
    name: '',
    subCategoryId: '',
    mainCategoryId: '',
  };

  settings = {
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

  itemList = [];
  itemToSave: Item[] = [];
  categoryName: string;
  temp_itemcount: number = 0;
  source: LocalDataSource = new LocalDataSource();

  constructor(private activeModal: NgbActiveModal, private biguserService: BiguserService,
    private service: SmartTableService,
    private alertifyService: AlertifyService ) { }

  ngOnInit() {
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
  bindCategoryList() {

    if ( this.categoryName !== undefined && this.categoryName !== '' && this.categoryName != null) {

      this.categoryName.trim;
      if (_.find(this.itemToSave, { 'categoryName': this.categoryName })) {
        this.alertifyService.warning('category name is already taken');
        return;
      }

      const item = new Item();
      item.id = this.temp_itemcount++;
      item.categoryName = this.categoryName;
      this.itemToSave.push(item);
      this.source.load(this.itemToSave);
    }else {
      this.alertifyService.error('Please enter category name');
    }
    return;
  }
}
