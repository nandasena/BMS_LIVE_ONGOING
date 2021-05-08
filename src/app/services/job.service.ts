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
}