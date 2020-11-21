import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { CommonService } from '../commonService/common.service';
import {KpiModel} from '../models/kpi-model'
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class CustomerSupplierService {

    constructor(private http: Http , private commonsService: CommonService ) {}

    getCustomerPaymentDetail(id){
        return this.commonsService.apiGet('CreditAndDebitAccountPayment/'+id);
    }

    getSupplierList() {
      return this.commonsService.apiGet('supplier/');
    }
    getCustomerList() {
      return this.commonsService.apiGet('customer/');
    }

    SaveSupplierList(supplierList: any) {
      return this.commonsService.apiPost(supplierList, 'supplier/');
    }
    SaveCustomerList(customerList: any) {
      return this.commonsService.apiPost(customerList, 'customer/');
    }

    getSupplierPaymentDetails(id){
      return this.commonsService.apiGet('CreditAndDebitAccountPayment/supplier/'+id);
    }
}
