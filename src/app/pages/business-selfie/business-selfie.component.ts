import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';

import { RatingService } from '../../services/rating.service';
import { BusinessSelfie } from '../../models/business-selfie';

@Component({
  selector: 'business-selfie',
  templateUrl: './business-selfie.component.html',
  styleUrls: ['./business-selfie.component.scss']
})
export class BusinessSelfieComponent implements OnInit {
  private ratingBar: boolean[];
  private isRated: boolean = false;   // if rating is already made
  private businessSelfie: BusinessSelfie;
  private controller: string = 'business-selfie';   // controller name for API
  private selectedRate: number = 0;
  private comment: string;

  constructor(private ratingService: RatingService) {
    this.businessSelfie = new BusinessSelfie();
    this.ratingBar = [false, false, false, false, false, false, false, false, false, false];
    this.getCurrentBusinessSelfie(this.controller, 1, 3);
  }

  ngOnInit(): void {
    
  }

  onClick(value: string): void {
    if (!this.isRated) {
      let passedValue = parseInt(value);
      this.fillRatingBar(passedValue);
    }
  }

  getCurrentBusinessSelfie(controller: string, userId: number, periodWeekId: number): void {
    this.ratingService.getRating(controller, userId, periodWeekId).then((response) => {
      let resultObj = response.json();

      if (resultObj.statusCode == 200 && resultObj.success) {
        /*
        Make UI model object as same as one that come from API.
        Then can assign directly to UI model object.
        */
        this.businessSelfie = resultObj.result;

        this.isRated = this.businessSelfie.value > 0 ? true : false;
        this.fillRatingBar(this.businessSelfie.value);
      }
    });
  }

  fillRatingBar(ratedValue: number): void {
    this.selectedRate = ratedValue;
    if (ratedValue == 0) {
      this.ratingBar = [false, false, false, false, false, false, false, false, false, false];
    
    } else {
      for (var i=0; i<10; i++) {
        this.ratingBar[i] = (i <= (ratedValue - 1)) ? true : false;
      }
    }
  }

  onSave(comment: string): void {
    // let apiBody: any = {
    //   "value": this.selectedRate,
    //   "comment": comment,
    //   "averageValue": 0,
    //   "userId": this.businessSelfie.userId,
    //   "periodWeekId": this.businessSelfie.periodWeekId
    // }

    let apiBody: any = {
      "value": this.selectedRate,
      "comment": comment,
      "averageValue": 0,
      "userId": 1,
      "periodWeekId": 3
    }

    if (this.isRated) {
      alert('Already Rated!');

    } else {
      this.ratingService.addRatingEntry(this.controller, apiBody);
    }
  }
}
