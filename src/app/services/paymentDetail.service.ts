import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from '../commonService/common.service';




@Injectable()
export class PaymentDetailService {

    constructor(private commonsService: CommonService) { }

    getCreditPaymentDetailsById(id){
        return this.commonsService.apiGet('CreditAndDebitAccountPayment/getCreditPaymentDetailsById/'+ id +'/');
    }

    

}