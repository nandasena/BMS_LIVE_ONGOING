import { ItemDetail } from "./itemDetail_model";

export class Item {
    itemId: number;
    itemDetailId: number;
    sellingQuantity: number;
    itemName: string;
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
}
