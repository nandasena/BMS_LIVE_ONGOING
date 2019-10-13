import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InviteUserComponent } from '../invite-user/invite-user.component';

@Component({
  template: `
    <button class="btn btn-md btn-primary" (click)="onInvite()">Invite</button>
  `,
})
export class InviteRenderButtonComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onInvite() {
      const activeModal = this.modalService.open(InviteUserComponent, {size:'lg', container: 'nb-layout'});
  }
}