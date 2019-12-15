import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../services/settings.service';
import * as _ from 'lodash';
import { AlertifyService } from '../../../services/alertify.service';
import { CategoryEditorComponent } from '../../settings/category-editor/category-editor.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

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
      mainCategoryId: {
        title: 'Category Code',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  data = {
    category: '',
  }
  init_data = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SettingsService,
              private modalService: NgbModal,
              private alertifyService: AlertifyService ) {}


  ngOnInit() {

    /// ----------Data Populate To Smart Table

    this.service.getMainCategoryList().then((response) => {
      this.init_data = response.json().result;
      this.source.load(this.init_data);
    }).catch((ex) => {
       this.init_data;
    });


  }

  onEdit(event) {
    const activeModal = this.modalService.open(CategoryEditorComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.rowData = event;
    this.data.category = 'mainCategory';
    activeModal.componentInstance.selectedTask = this.data;
  }
  Categorydelete(event) {
    let innerthis = this;
    this.alertifyService.confirm('Delete Category - ' + event.data.name, 'Are you sure you want to delete this issue?', function () {

      _.remove( innerthis.init_data , { 'mainCategoryId': event.data.mainCategoryId });
      innerthis.source.load( innerthis.init_data );
     /* innerthis.settingsservice.delete(event.data.).then((response) => {
        let message = response.json();
        if (message.statusCode == 200) {
          innerthis.alertifyService.success('Deleted Successfully!');
          let id = event.data.pkId;
          _.remove(innerthis.sortedList, { 'pkId': id });
          innerthis.source.load(innerthis.sortedList);
        } else {
          innerthis.alertifyService.error('somthing went wrong!');
        }
      });*/
    });
  }

}


