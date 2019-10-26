import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbEmailPassAuthProvider, NbDummyAuthProvider, NbAuthModule } from '@nebular/auth';
import { AuthGuardService } from './services/auth-guard.service';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf} from 'rxjs/observable/of';
import { RoleProviderService } from './services/role-provider.service';
import {CommonService} from './commonService/common.service';
import {InvoiceService} from './services/invoice.service';
import { HttpModule } from '@angular/http';
import {Config} from './config/config.service';
import {BiguserService} from './services/biguser.service';
import { RatingService } from './services/rating.service';
import { AlertifyService } from './services/alertify.service';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import {InventoryService} from './services/inventory.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: environment.apiBaseUrl,
            login: {
              endpoint: 'user/login/',
              method: 'post',
              redirect: {
                success: '/pages',
                failure: '/',
              },
              token: {
                key: 'test',
              },
            },
            register: {
              endpoint: 'user/register/',
              method: 'post',
              redirect: {
                success: '/auth/register-success',
                failure: '/auth/register-fail',
              },
              token: {
                key: 'test',
              },
            },
            logout: {
              endpoint: 'user/logout/',
              method: 'post',
              redirect: {
                success: '/',
                failure: '/',
              },
              token: {
                key: 'test',
              },
            },
          }
        }
      },
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['targets', 'business-selfie', 'company-ratings'],
        },
        user: {
          view: ['invoice', 'rocks', 'targets', 'teams', 'business-selfie'],
        }
      },
    }),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    HttpModule,
    NgxSpinnerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    AuthGuardService,
    RoleProviderService,
    CommonService,
    InvoiceService,
    Config,
    BiguserService,
    RatingService,
    AlertifyService,
    InventoryService
  ],
})
export class AppModule {
}
