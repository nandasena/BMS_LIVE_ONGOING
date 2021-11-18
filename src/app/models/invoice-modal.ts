import {Item} from './item_modal'
import{PaymentModal}from './payment-modal';
import {Customer} from './customer_model';
export class InvoiceModel {
    id:number;
    totalAmount:number;
    invoiceDate:string;
    customerName:string;
    balanceAmount:number;
    customerId:number;
    itemList:Item[];
    paymentDetailList:PaymentModal[];
    tempCustomerVO:Customer;
    returnDate:string;
    returnDescription:string;
}