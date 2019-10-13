import {Item} from './item_modal'
export class InvoiceModel {
    totalAmount:number;
    invoiceDate:string;
    customerName:string;
    balanceAmount:number;
    itemList:Item[];
}