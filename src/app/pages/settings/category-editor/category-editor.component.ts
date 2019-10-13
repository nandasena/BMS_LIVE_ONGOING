import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BiguserService} from '../../../services/biguser.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';

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
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private activeModal: NgbActiveModal, private biguserService: BiguserService,
    private service: SmartTableService ) { }

  ngOnInit() {
  }

  closeModal() {
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
  bindCategoryList() {}
}
