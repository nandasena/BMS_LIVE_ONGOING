import {Item} from './item_modal'
import{PaymentModal}from './payment-modal'
export class InvoiceModel {
    totalAmount:number;
    invoiceDate:string;
    customerName:string;
    balanceAmount:number;
    customerId:number;
    itemList:Item[];
    paymentDetailList:PaymentModal[];
}