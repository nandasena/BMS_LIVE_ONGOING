var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';
import { NbAbstractAuthProvider } from './abstract-auth.provider';
import { NbAuthResult } from '../services/auth-result';
var NbDummyAuthProvider = /** @class */ (function (_super) {
    __extends(NbDummyAuthProvider, _super);
    function NbDummyAuthProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultConfig = {
            delay: 1000,
        };
        return _this;
    }
    NbDummyAuthProvider.prototype.authenticate = function (data) {
        console.log('HELLOOOOO', data);
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getConfigValue('delay')));
    };
    NbDummyAuthProvider.prototype.register = function (data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getConfigValue('delay')));
    };
    NbDummyAuthProvider.prototype.requestPassword = function (data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getConfigValue('delay')));
    };
    NbDummyAuthProvider.prototype.resetPassword = function (data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getConfigValue('delay')));
    };
    NbDummyAuthProvider.prototype.logout = function (data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getConfigValue('delay')));
    };
    NbDummyAuthProvider.prototype.createDummyResult = function (data) {
        
        let userToken = '';
        if (this.getConfigValue('alwaysFail')) {
            // TODO we dont call tokenService clear during logout in case result is not success
            return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
        }
        // TODO is it missed messages here, is it token should be defined
        switch (data.email) {
            case 'eva.moor@big.com': {
                userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV2YS5tb29yQGJpZy5jb20iLCJuYW1lIjoiRXZhIE1vb3IiLCJyb2xlIjoiYWRtaW4ifQ.y6j9PCk4E2JmqHopVom0vUpt_j1Y55QLwWRI1YdWIn0';
                break;
            }
            case 'sam.zack@big.com': {
                userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbS56YWNrQGJpZy5jb20iLCJuYW1lIjoiU2FtIFphY2siLCJyb2xlIjoibHYzIn0.GzlE_vTZUfoja4xV545hMwNU8MOx1w377lDuCa36STs';
                break;
            }
            default: {
                userToken = '';
            }
        }

        console.log('DUMMY_RES', data.email, userToken);
        return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.'], ['Login okay'], userToken);
    };
    NbDummyAuthProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbDummyAuthProvider.ctorParameters = function () { return []; };
    return NbDummyAuthProvider;
}(NbAbstractAuthProvider));
export { NbDummyAuthProvider };
//# sourceMappingURL=dummy-auth.provider.js.map