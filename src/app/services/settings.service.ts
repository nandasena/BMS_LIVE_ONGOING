import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { CommonService } from '../commonService/common.service';
import {KpiModel} from '../models/kpi-model'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsService {
  private tableList: any[] = [];
  private sharedItemObject = new BehaviorSubject(this.tableList);
  private sharedCategoryObject =new BehaviorSubject(this.tableList);
  modifiedSharedItemObject = this.sharedItemObject.asObservable();
  modifiedSharedCategoryObject = this.sharedCategoryObject.asObservable(); 

  constructor(private http: Http , private commonsService: CommonService) {}

  getMainCategoryList() {
    return this.commonsService.apiGet('category/mainCategory/');
  }
  getSubCategoryList() {
    return this.commonsService.apiGet('category/subCategory/');
  }
  saveMainCategoryList(CategoryList: any) {

    return this.commonsService.apiPost(CategoryList, 'category/mainCategory/');
  }
  saveSubCategoryList(CategoryList: any) {
    return this.commonsService.apiPost(CategoryList, 'category/subCategory/');
  }

  DeleteMainCategory(CateGoryId: number) {
   // return this.commonService.apid("issue//task/"+taskId);
  }

  getItemList() {
    return this.commonsService.apiGet('item/');
  }
  saveItemList(itemList: any) {
    return this.commonsService.apiPost(itemList, 'item/itemList/');
  }

  saveItemDetail(itemList: any) {
    return this.commonsService.apiPost(itemList, 'itemDetail/');
  }

  getNewItemList():any {
    return this.modifiedSharedItemObject;
  }
  loadItemList(editObject: any){
    this.sharedItemObject.next(editObject);
  }
  getNewCategoryList(){
    return this.modifiedSharedCategoryObject;
  }
  loadCategoryList(editObject: any){
    this.sharedCategoryObject.next(editObject);
  }
}
