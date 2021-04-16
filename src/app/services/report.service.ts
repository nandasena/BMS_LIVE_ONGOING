import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { CommonService } from '../commonService/common.service';
import {KpiModel} from '../models/kpi-model'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ReportService {

    constructor(private commonsService: CommonService ) {

    }

    getInvoiceDetailsByDateRange(fromDate,toDate){
        return this.commonsService.apiGet('report/invoiceByDateRange/fromDate/'+fromDate+'/toDate/'+toDate+'/');
    }

    getItemDetailsByDateRange(fromDate,toDate){
        return this.commonsService.apiGet('report/itemDetailsByDateRange/fromDate/'+fromDate+'/toDate/'+toDate+'/');
    }
}