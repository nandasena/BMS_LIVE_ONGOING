import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceExpandComponent } from '../invoice-expand/invoice-expand.component'

@Component({
  template: `
    <div style="text-align: center;" (click)="onExpand($event)"><i class="fa fa-arrows-alt fa-2" aria-hidden="true"></i></div>
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onExpand(event): void {
      console.log('EXPAND===', event);
      this.showExpandModal();
  }

  showExpandModal() {
    const activeEditModal = this.modalService.open(InvoiceExpandComponent, {size:'lg', container: 'nb-layout'});
  }

}
