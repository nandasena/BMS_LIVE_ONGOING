import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from '../commonService/common.service';




@Injectable()
export class PurchaseOrderService {
    private tableList: any[] = [];
    private sharedPurchaseOrderObject = new BehaviorSubject(this.tableList);
    modifiedPurchaseOrderObject = this.sharedPurchaseOrderObject.asObservable();

    constructor(private http: Http, private commonsService: CommonService) { }



    loadPurchaseOrderList(editObject: any): void {
        this.sharedPurchaseOrderObject.next(editObject);
    }

    getCreditList(): any {
        return this.modifiedPurchaseOrderObject;

    }

    getAllPurchaseOrderByDate(fromDate, toDate) {
        return this.commonsService.apiGet('purchaseOrder/fromDate/' + fromDate + '/toDate/' + toDate + '/');
    }

    getPurchaseOrderDetailById(id){
        return this.commonsService.apiGet('purchaseOrder/getPurchaseOrderDetailById/'+ id +'/');
    }

    getBranchList(){
        return this.commonsService.apiGet('purchaseOrder/getBranch/');
    }

    savePurchaseOrder(purchaseOrderData){
        return this.commonsService.apiPost(purchaseOrderData,'purchaseOrder/');
    }

}