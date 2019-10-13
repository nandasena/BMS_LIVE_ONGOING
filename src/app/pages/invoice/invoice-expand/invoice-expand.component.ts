import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kpi-expand',
  templateUrl: './invoice-expand.component.html',
  styleUrls: ['./invoice-expand.component.scss']
})
export class InvoiceExpandComponent {

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
