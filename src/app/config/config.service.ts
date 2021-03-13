import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';

@Injectable()
export class Config {
    private _config: Object;

    constructor(private http: Http) {
        this.loadConfig();
    }
    ngOnInit() {
        
    }

    loadConfig() {
        // return new Promise((resolve, reject) => {
        //     this.http.get('assets/config.json').map(res => res.json())
        //         .catch((error: any) => {
        //             console.error(error);
        //             return Observable.throw(error.json().error || 'Server error');
        //         })
        //         .subscribe((data) => {
        //             this._config = data;
        //             resolve(true);
        //         })
        // });
    }

    getAPIBasePath(): string {
        return this._config['apiBasePath'];
    }

    useWhichAPI(apiName: string): string {
        switch (apiName) {
            case 'accLab': {
                return 'acclab/v1/';
            }

            case 'sincere': {
                return 'sincere/v1/';
            }
            case 'uploadedImage': {
                return this._config['uploadedImagesPath'];
                // http://localhost/sincere/trunk/api/src/routes/sincere/uploads/jobDesignImage/
                
            }

            default: {
                return 'xxx';
            }
        }
    }
}