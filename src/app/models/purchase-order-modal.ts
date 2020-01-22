import {Item} from './item_modal';
export class PurchaseOrderModel {
    totalAmount:number;
    purchaseOrderDate:string;
    estimateReceiveDate:string;
    supplierId:number;
    userId:number;
    branchId:number;
    itemVOList:Item[];
    
}