import { Injectable } from '@angular/core';
import { CommonService } from '../commonService/common.service';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class JobService {
    private controllerBaseURL: string = 'job';


    private tableList: any[] = [];
    private sharedJobList = new BehaviorSubject(this.tableList);
    modifiedJobList = this.sharedJobList.asObservable();

    constructor(private commonService: CommonService) {
    }
    getAllRating() {
        return this.commonService.apiGet(this.controllerBaseURL + "/otherExpenses/")
    }

    saveJob(jobToSave: any) {
        return this.commonService.apiPost(jobToSave, 'job/createJob/');
    }
    getJobList() {
        return this.commonService.apiGet(this.controllerBaseURL + '/getJobList/');
    }
    getJobById(id) {
        return this.commonService.apiGet(this.controllerBaseURL + '/getJobListById/' + id);
    }
    saveExpenses(jobExepenses) {
        return this.commonService.apiPost(jobExepenses, 'job/addExpensesById/');
    }
    addNewItems(jobToSave: any) {
        return this.commonService.apiPost(jobToSave, 'job/addItemsById/');
    }

    addReceivedItem(ItemList) {
        return this.commonService.apiPost(ItemList, 'job/removeReceivedItemsById/');

    }
    getJobDetailsByDate(fromDate, toDate) {
        return this.commonService.apiGet('job/fromDate/' + fromDate + '/toDate/' + toDate);
    }
    changeJobStatus(jobId,statusId){
        return this.commonService.apiGet(this.controllerBaseURL+'/jobId/'+jobId+'/statusId/'+statusId+'/');
    }
    loadModifiedJobList(editObject: any): void {
        this.sharedJobList.next(editObject);
    }
    getModifiedJobList(): any {
        return this.modifiedJobList;
  
      }
}