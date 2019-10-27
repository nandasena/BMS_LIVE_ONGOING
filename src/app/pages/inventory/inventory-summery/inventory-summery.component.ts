import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'issue-summery',
  templateUrl: './inventory-summery.component.html',
  styleUrls: ['./inventory-summery.component.scss']
})
export class InventorySummeryComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
