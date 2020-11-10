import { ItemDetail } from "./itemDetail_model";
import { PriceList } from "./price-list.modal"

export class Item {
    itemId: number;
    id: number;
    itemDetailId: number;
    sellingQuantity: number;
    itemName: string;
    name: string;
    description: string;
    categoryName: string;
    subCategoryId: number;
    SellingQuantity: number;
    price: number;
    itemDiscount: number;
    total: number;
    itemCode: string;
    orderQuantity: number;
    discountPercentage: number;
    itemdetailList: ItemDetail;
    availableQuantity: number;
    fabricatorPrice: number;
    cost: number;
    typeOfPrice:number;
    typeOfDiscount:number;
    priceName:string;
    priceList: PriceList[];
}
