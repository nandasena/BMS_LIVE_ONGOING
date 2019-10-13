import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kpi-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  buttonsViews = [{
    title: 'Select UOM',
  },{
    title: 'Amount',
  }, {
    title: 'Hours per Quarter',
  }, {
    title: 'Milestone',
  }];

  selectedView = this.buttonsViews[0];

  members = [{
    title: 'Select Member',
  },{
    title: 'Sam Akpin',
  }, {
    title: 'Hours per Quarter',
  }, {
    title: 'Milestone',
  }];

  memebersView = this.members[0];

  closeModal() {
    this.activeModal.close();
  }

}
