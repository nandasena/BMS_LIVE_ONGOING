import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BiguserService } from "../../../../services/biguser.service";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { SmartTableService } from "../../../../@core/data/smart-table.service";
import { Category } from "../../../../models/category_model";
import { Item } from "../../../../models/item_modal";
import { AlertifyService } from "../../../../services/alertify.service";
import { SettingsService } from "../../../../services/settings.service";
import * as _ from "lodash";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ItemDetail } from "../../../../models/itemDetail_model";
import { copyConfig } from "@angular/router/src/config";
import { r } from "@angular/core/src/render3";
@Component({
  selector: "item-editor",
  templateUrl: "./item-editor.component.html",
  styleUrls: ["./item-editor.component.scss"]
})
export class ItemEditorComponent implements OnInit {

  temp_itemcount: number = 0;
  mainCategoryList = [];
  subCategoryList = [];
  selectedCategory: Category;
  selectedSubCategory: Category;
  changebleSubCategoryList: Category[] = [];
  itemName: string;
  itemCode:string;
  discription:string;
  private initcategory: Category = {
    name: "Select Category",
    categoryName: "",
    mainCategoryName: "",
    subCategoryId: 0,
    mainCategoryId: 0,
    id: 0
  };
  modalReference: NgbModalRef;
  itemToSave: Item[] = [];
  source: LocalDataSource = new LocalDataSource();
  customerPrice;
  fabricatorPrice;
  mrpPrice;
  costprice;
  itemDetailId;
  @Input() rowData;

  constructor(private service: SmartTableService,
              private modalService: NgbModal ,
              private alertifyService: AlertifyService,
              private activeModal: NgbActiveModal,
              private settingsservice: SettingsService,
              private spinner: NgxSpinnerService,
              ) {

    this.selectedCategory = this.selectedSubCategory = this.initcategory;
  }
  ngOnInit() {
    console.log("rowData===",this.rowData);
    this.mrpPrice =this.rowData.data.itemDetailList[0].mrpPrice;
    this.customerPrice =this.rowData.data.itemDetailList[0].customerPrice;
    this.fabricatorPrice =this.rowData.data.itemDetailList[0].fabricatorPrice;
    this.itemName = this.rowData.data.itemName;
    this.itemCode = this.rowData.data.itemCode;
    this.costprice =this.rowData.data.itemDetailList[0].costPrice;
    this.itemDetailId =this.rowData.data.itemDetailList[0].itemDetailId;


  }

  onChangeSubCategory(category: Category): void {
    this.selectedSubCategory = category;
  }
  closeModal() {
    this.temp_itemcount = 0;
    this.activeModal.close();
  }
  saveItemDetail(){
    if(this.costprice ==""){
      this.alertifyService.error("Please Enter Cost");
        return false;
    }
    if(Number(this.costprice)==null){
      this.alertifyService.error("Please Enter Only Number");
      return false;
    }
    if(this.customerPrice ==""){
      this.alertifyService.error("Please Enter Cost");
        return false;
    }
    if(Number(this.customerPrice)==null){
      this.alertifyService.error("Please Enter Only Number");
      return false;
    }

    if(this.fabricatorPrice ==""){
      this.alertifyService.error("Please Enter Cost");
        return false;
    }
    if(Number(this.fabricatorPrice)==null){
      this.alertifyService.error("Please Enter Only Number");
      return false;
    }
    if(this.mrpPrice ==""){
      this.alertifyService.error("Please Enter Cost");
        return false;
    }
    if(Number(this.mrpPrice)==null){
      this.alertifyService.error("Please Enter Only Number");
      return false;
    }

    let itemDetail = new ItemDetail();
    itemDetail.costPrice =Number(this.costprice);
    itemDetail.customerPrice =Number(this.customerPrice);
    itemDetail.fabricatorPrice =Number(this.fabricatorPrice);
    itemDetail.mrpPrice =Number(this.mrpPrice);
    itemDetail.itemDetailId=this.itemDetailId;
    let innerThis =this;

    this.alertifyService.confirm('Save Item', 'Are you sure you want to save Item', function () {
      console.log("Item Details=== ",itemDetail);
      innerThis.spinner.show();
      innerThis.settingsservice.saveItemDetails(itemDetail).then(response=>{
        innerThis.spinner.hide();
        let  result = response.json();
        if(result.statusCode ==200){
          innerThis.alertifyService.success("Update is success");
          innerThis.settingsservice.getItemList().then(response=>{
            innerThis.settingsservice.loadEditItemList(response.json().result);
          })
          innerThis.closeModal();

        }else{
          innerThis.alertifyService.error("Update is not success");
        }
        
      })
      

    });

  }


}
