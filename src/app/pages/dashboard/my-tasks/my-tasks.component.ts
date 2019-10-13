import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

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
        title: 'Identifier Code',
        type: 'number',
      },
      name: {
        title: 'Task',
        type: 'string',
      },
      dueDate: {
        title: 'Due Date',
        type: 'string',
      },
      priority: {
        title: 'Priority',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService) {
    const data = this.service.getMyTaskList();
    this.source.load(data);
  }

  ngOnInit() {
  }

}
