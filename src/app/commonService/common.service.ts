import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Config } from '../config/config.service';
import { environment } from '../../environments/environment';

@Injectable()
export class CommonService {
    private basePath: string;
    constructor(
        private http: Http, 
        private config: Config,
    ) { 
        this.basePath = environment.apiBaseUrl;
    }

    /**
     * 
     * @param requestBody |the body should be in a JSON format
     * @param apiToken 
     * @param apiURL 
     * @param whichAPI 
     */
    
    apiPost(requestBody: any,apiURL:string): Promise<Response> {
        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        //requestHeaders.append('Authorization', 'Bearer ' + userInfo.loginId);

        return this.http
            .post(this.basePath + apiURL, requestBody, {headers: requestHeaders})
            .toPromise()
            .then(
                (response: Response) => {
                    return response;
                }
            )
            .catch(
                (error: Response)  => {
                  /*  if (error.status == 401) {
                        let tokenRequestBody = {
                            "email": "admin@serp.org", 
                            "password": "admin"
                        };

                        let tokenRequestHeaders = new Headers();
                        tokenRequestHeaders.append('Content-Type', 'application/json');
                        tokenRequestHeaders.append('Accept', 'application/json');

                        // let firstCheck = this.http
                        //     .post(this.config.getAPIBasePath(), tokenRequestBody, {headers: tokenRequestHeaders})
                        //     .toPromise()
                        //     .then((response: Response) => {
                        //         let tokenApiResponse = response.json();
                        //         let secondCall = this.apiPost(requestBody, whichAPI, apiURL);
                        //         return response;
                        //     });

                        // return firstCheck;

                    } else {*/
                        return error;
                   // }
                }
            );
    }

    /**
     * 
     * @param requestBody |the body should be in a JSON format
     * @param apiToken 
     * @param apiURL 
     * @param whichAPI 
     */
    apiGet(apiURL: string): Promise<Response> {
        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
       // let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            return this.http
            .get(this.basePath + apiURL, {headers: requestHeaders})
            .toPromise()
            .then(
                
                (response: Response) => {
                   // let apiResponse =response.json();
                    return response;
                }
            )
            
            .catch(
                (error: Response)  => {
                    if (error.status == 401) {
                        let tokenRequestBody = {
                            "email": "admin@serp.org", 
                            "password": "admin"
                        };

                        let tokenRequestHeaders = new Headers();
                        tokenRequestHeaders.append('Content-Type', 'application/json');
                        tokenRequestHeaders.append('Accept', 'application/json');

                        // let firstCheck = this.http
                        //     .post(this.config.getAPIBasePath() + 'api/public/token', tokenRequestBody, {headers: tokenRequestHeaders})
                        //     .toPromise()
                        //     .then((response: Response) => {
                        //         let tokenApiResponse = response.json();
                        //       //  let secondCall = this.apiGet(whichAPI, apiURL);
                        //         return response;
                        //     });

                        // return firstCheck;

                    } else {
                        return error;
                    }
                }
            );
    }

    getFormattedDate(myDatePickerObject: any): string {
        return myDatePickerObject.year + '-' + myDatePickerObject.month + '-' + myDatePickerObject.day;
    }
}