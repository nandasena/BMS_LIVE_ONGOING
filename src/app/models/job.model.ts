import { Item } from "./item_modal";
import{PaymentModal}from './payment-modal';
export class Job {
    name : string;
    description : string;
    startDate :string;
    jobDate:string;
    endDate:string;
    state:number;
    customerId :number;
    amount:number;
    discount:number;
    ratePerSquareFeet:number;
    squareFeet:number;
    costType:number;
    paymentType:number;
    itemVOList :Item[];
    paymentDetailList:PaymentModal[];
}