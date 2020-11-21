import { from } from 'rxjs/observable/from';
import {ReceiveModale} from './item-received-modal'
import {PaymentModal} from './payment-modal';
export class GoodReceivedModal {
    receivedDate:String;
    purchaseOrderId:Number;
    itemDetailsVOList:ReceiveModale[];
    paymentDetailsList:PaymentModal[];
}