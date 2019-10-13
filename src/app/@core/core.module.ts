import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

import { environment } from '../../environments/environment';

const socialLinks = [
  // {
  //   url: 'https://github.com/akveo/nebular',
  //   target: '_blank',
  //   icon: 'socicon-github',
  // },
  // {
  //   url: 'https://www.facebook.com/akveo/',
  //   target: '_blank',
  //   icon: 'socicon-facebook',
  // },
  // {
  //   url: 'https://twitter.com/akveo_inc',
  //   target: '_blank',
  //   icon: 'socicon-twitter',
  // },
];

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          baseEndpoint: environment.apiBaseUrl,
          login: {
            endpoint: 'userAuth/login/',
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
          requestPass:{
            endpoint: 'user/requestPass/',
            method: 'post',
            redirect: {
              success: null,
              failure: null,
            },
            token: {
              key: 'test',
            },
          },
          resetPass:{
            endpoint: 'user/resetPass/',
            method: 'post',
            redirect: {
              success: null,
              failure: null,
            },
            token: {
              key: 'test',
            },
          }
        }
      },
    },
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
