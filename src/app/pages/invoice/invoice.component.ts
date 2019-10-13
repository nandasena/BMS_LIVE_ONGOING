import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import {InvoiceService}from '../../services/invoice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'invoice',
  styleUrls: ['./invoice.component.scss'],
  templateUrl: './invoice.component.html',
})

export class InvoiceComponent  {
  constructor(
     private modalService: NgbModal,
     private invoiceService:InvoiceService,
     private router: Router
     ) {}

  ngOnInit(){
  }
  showModal() {
    // const activeModal = this.modalService.open(InvoiceAddComponent, {size:'lg', container: 'nb-layout'});
    this.router.navigate(['/pages/invoice-add']);
  }


}
