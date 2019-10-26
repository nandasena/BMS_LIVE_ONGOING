import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventorySummeryComponent } from './inventory-summery/inventory-summery.component';

@Component({
  selector: 'issues',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  showAddIssue() {
    const activeModal = this.modalService.open(InventoryAddComponent, {size:'lg', container: 'nb-layout'});
  }

  showSummery() {
    const activeModal = this.modalService.open(InventorySummeryComponent, {size:'lg', container: 'nb-layout'});
  }
}
