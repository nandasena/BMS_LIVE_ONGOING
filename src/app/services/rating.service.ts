import { Injectable } from '@angular/core';
import { CommonService } from '../commonService/common.service';
import { Response } from '@angular/http';

@Injectable()
export class RatingService {
  private controllerBaseURL: string = 'rating/';

  constructor(private commonService: CommonService) { 
  }

  addRatingEntry(whichController: string, payLoad: any): Promise<Response> {
    console.log('PAYYYY===', payLoad);
    return this.commonService.apiPost(payLoad, this.controllerBaseURL + whichController + '/');
  }

  getRating(whichController: string, userId: number, periodWeekId: number): Promise<Response> {
    return this.commonService.apiGet(this.controllerBaseURL + whichController + '/' + userId + '/?periodid=' + periodWeekId);
  }
}
