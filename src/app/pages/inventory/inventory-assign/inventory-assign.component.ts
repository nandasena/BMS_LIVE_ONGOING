import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'issue-assign',
  templateUrl: './inventory-assign.component.html',
  styleUrls: ['./inventory-assign.component.scss']
})
export class InventoryAssignComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
