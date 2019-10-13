import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { CommonService } from '../commonService/common.service';

@Injectable()
export class BiguserService{
    constructor(private http: Http , private commonService : CommonService ){}

    getUsers(){
        return this.commonService.apiGet('users/');
    }
    addUser(userData){
        return this.commonService.apiPost(userData, 'users/');
    }
    login(loginData){
        return this.commonService.apiPost(loginData, 'login/');
    }
}
