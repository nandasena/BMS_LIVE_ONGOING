import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from '../commonService/common.service';


@Injectable()
export class QuotationService {

    constructor(private http: Http , private commonsService: CommonService ) {}

    saveQuotation(invoiceToSave:any){
        return this.commonsService.apiPost(invoiceToSave,'quotation/invoice/');
      }

}