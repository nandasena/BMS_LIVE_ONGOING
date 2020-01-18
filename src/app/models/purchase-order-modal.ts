import {Item} from './item_modal';
export class PurchaseOrderModel {
    totalAmount:number;
    purchaseOrderDate:string;
    estimationReceivedDate:string;
    supplierId:string;
    itemList:Item[];
    
}