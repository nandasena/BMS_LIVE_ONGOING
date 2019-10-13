import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { InviteRenderButtonComponent } from '../user-list/invite-render-button.component';
import {BiguserService} from '../../../services/biguser.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private biguserService: BiguserService, private modalService: NgbModal) {
  }
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
      deleteButtonContent: '<i class="nb-trash" (deleteConfirm)="deleteRecord($event)"></i>'
    },
    
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      userLevelText: {
        title: 'User Level',
        type: 'string',
      },
      invite: {
        title: '',
        type: 'custom',
        renderComponent: InviteRenderButtonComponent
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();



  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.biguserService.getUsers().then(users =>{
      const bigUsers = users.json();
      _.map(bigUsers, function(user){
        user.userLevelText = user.userLevel ? user.userLevel.name : '-';
        return user;
      });
      if(bigUsers){
       this.source.load(bigUsers);
      }
    });
  }
  deleteRecord(event) {
    console.log("eee");
  }
}
