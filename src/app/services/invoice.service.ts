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
export class InvoiceService {
    private tableList: any[] = [];
    private sharedDataObject = new BehaviorSubject(this.tableList);
    private sharedInvoiceCreditObject = new BehaviorSubject(this.tableList);
    private sharedPurchaseOrderObject =new BehaviorSubject(this.tableList);
    modifiedDataList = this.sharedDataObject.asObservable();
    modifiedCreditList =this.sharedInvoiceCreditObject.asObservable();
    modifiedPurchaseOrderObject =this.sharedPurchaseOrderObject.asObservable();
    constructor(private http: Http , private commonsService: CommonService ) {}

    getInvoice(){
        return this.commonsService.apiGet('invoice/');
    }

    getLoadedList(): any {
      return this.modifiedDataList;

    }
    loadEditObject(editObject: any): void {
      this.sharedDataObject.next(editObject);
    }

    getMaiCategoryList(){
      return this.commonsService.apiGet('category/mainCategory/');
    }

    getSubCategoryList(){
      return this.commonsService.apiGet('category/subCategory/');
    }

    getItemList(){
      return this.commonsService.apiGet('item/');
    }
    saveInvoice(invoiceToSave:any){
      return this.commonsService.apiPost(invoiceToSave,'invoice/');
    }

    getCustomerList(){
      return this.commonsService.apiGet('customer/');
    }
    getItemByItemCode(itemCode){
      return this.commonsService.apiGet('item/'+itemCode);
    }
    getInvoiceDetailByInvoiceId(invoiceId){
        return this.commonsService.apiGet('invoice/'+invoiceId);
    }

    getInvoiceByDateRange(fromDate,toDate){
        return this.commonsService.apiGet('invoice/fromDate/'+fromDate+'/toDate/'+toDate);
    }

    getInvoiceCreditList(fromDate,toDate,type){
      return this.commonsService.apiGet('invoice/paymentDetail/fromDate/'+fromDate+'/toDate/'+toDate+'/type/'+type);
    }

    getCreditList(): any {
      return this.modifiedCreditList;

    }

    loadEditCreditList(editObject: any): void {
      this.sharedInvoiceCreditObject.next(editObject);
    }

    saveCreditPayment(paymentModal:any){
      return this.commonsService.apiPost(paymentModal,'invoice/creditPayment/');
    }
    getInvoiceDetailForReprintById(id){
      return this.commonsService.apiGet('invoice/getInvoiceReprintData/'+id);
    }

    getBankList(){
      return this.commonsService.apiGet('bank/getAllBank/');
    }
}
