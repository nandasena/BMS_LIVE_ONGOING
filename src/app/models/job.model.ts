import { Item } from "./item_modal";
export class Job {
    name : string;
    description : string;
    startDate :string;
    endDate:string;
    state:number;
    customerId :number;
    amount:number;
    discount:number;
    ratePerSquareFeet:number;
    costType:number;
    paymentType:number;
    itemVOList :Item[];
}