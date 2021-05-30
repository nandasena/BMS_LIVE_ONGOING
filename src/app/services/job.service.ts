import { Injectable } from '@angular/core';
import { CommonService } from '../commonService/common.service';
import { Response } from '@angular/http';

@Injectable()
export class JobService{
    private controllerBaseURL: string = 'job';
    constructor(private commonService: CommonService) { 
    }
    getAllRating(){
        return this.commonService.apiGet(this.controllerBaseURL+"/otherExpenses/")
    }

    saveJob(jobToSave:any){
        return this.commonService.apiPost(jobToSave,'job/createJob/');
      }
    getJobList(){
        return this.commonService.apiGet(this.controllerBaseURL+'/getJobList/');
    }
    getJobById(id){
        return this.commonService.apiGet(this.controllerBaseURL+'/getJobListById/'+id);
    }
    saveExpenses(jobExepenses){
        return this.commonService.apiPost(jobExepenses,'job/addExpensesById/');   
    }
    addNewItems(jobToSave:any){
        return this.commonService.apiPost(jobToSave,'job/addItemsById/');
    }

    addReceivedItem(ItemList){
        return this.commonService.apiPost(ItemList,'job/removeReceivedItemsById/');

    }
}