import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BiguserService} from '../../../services/biguser.service';

@Component({
  selector: 'invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {
  user ={
    name: '', email: '', level: 5
  };

  constructor(private activeModal: NgbActiveModal, private biguserService: BiguserService) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
  createUser(){

    this.biguserService.addUser({
      userName: this.user.email,
      groupCode: 1,
      name: this.user.name,
      email: this.user.email,
      levelCode: this.user.level
    }).then(status =>{
      this.closeModal();
    });
  }
}
