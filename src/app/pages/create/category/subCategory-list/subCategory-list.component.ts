import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../../services/settings.service';
import { CategoryEditorComponent } from '../../../settings/category-editor/category-editor.component';

@Component({
  selector: 'subCategory-list',
  templateUrl: './subCategory-list.component.html',
  styleUrls: ['./subCategory-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

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
      subCategoryId: {
        title: 'Sub Category Code',
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

  constructor(private service: SettingsService, private modalService: NgbModal ) {}


  ngOnInit() {
    /// ----------Data Populate To Smart Table
    this.service.getSubCategoryList().then((response) => {
      this.init_data = response.json().result;
      this.source.load(this.init_data);
    }).catch((ex) => {
       this.init_data;
    });

    this.service.getNewSubCategoryList().subscribe(response=>{
      this.init_data = response;
      this.source.load( this.init_data);
    });


  }

  onEdit(event) {
    const activeModal = this.modalService.open(CategoryEditorComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.rowData = event;
    this.data.category = 'mainCategory';
    activeModal.componentInstance.selectedTask = this.data;
  }

}

