import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import {InvoiceService}from '../../services/invoice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'purchaseOrder',
  styleUrls: ['./purchase-order.component.scss'],
  templateUrl: './purchase-order.component.html',
})

export class PurchaseOrderComponent  {
  constructor(
     private modalService: NgbModal,
     private invoiceService:InvoiceService,
     private router: Router
     ) {}

  ngOnInit(){
  }
  showModal() {
    this.router.navigate(['/pages/create-purchase-order']);
}
  
}