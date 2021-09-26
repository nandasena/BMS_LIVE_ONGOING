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

    getQuotationByDateRange(fromDate,toDate){
      return this.commonsService.apiGet('quotation/invoiceByDateRange/fromDate/' + fromDate + '/toDate/' + toDate+'/');
    }
    getQuotationDetailsById(id){

      return this.commonsService.apiGet('quotation/invoice/'+id+'/');
    }
    getInvoiceDetailForReprintById(id){
      return this.commonsService.apiGet('quotation/getInvoiceReprintData/'+id);
    }

}