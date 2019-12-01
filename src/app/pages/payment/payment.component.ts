import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {InvoiceService}from '../../services/invoice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'payment',
  styleUrls: ['./payment.component.scss'],
  templateUrl: './payment.component.html',
})

export class PaymentComponent  {
  constructor(
     private modalService: NgbModal,
     private invoiceService:InvoiceService,
     private router: Router
     ) {}

  ngOnInit(){
  }

}
