import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemDetailsComponent } from '../item-detail/item-detail.component';

@Component({
  template: `
  <div style="text-align: center; color: #787878;"  onMouseOver="this.style.color='#40dc7e'"
  onMouseOut="this.style.color='#787878'" (click)="addItemDetails()"><i class="fa fa-table fa-2" aria-hidden="true"></i></div>
  `,
})

export class ItemBtnComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    console.log("Item Edit ========");
    this.renderValue = this.value.toString().toUpperCase();
  }

  addItemDetails() {
    console.log("Item Edit ========");
    const activeModal = this.modalService.open(ItemDetailsComponent, { size: 'lg', container: 'nb-layout',windowClass:'ItemDetailsWindow' });
    activeModal.componentInstance.rowData = this.rowData;
  }
}
