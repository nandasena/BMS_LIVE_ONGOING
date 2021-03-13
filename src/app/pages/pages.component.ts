 import { Component } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

import { MENU_ITEMS,LEVEL02_MENUS} from './pages-menu';

//import { UtilService } from '../services/util.service';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  private user: any;
  menu: NbMenuItem[] = [];

  constructor (private authService: NbAuthService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();

        switch (this.user.role) {
          case 'admin': {
            this.menu = MENU_ITEMS;
            break;
          }
          case 'level01': {
            this.menu = LEVEL02_MENUS;
            break;
          }
          // case 'level02': {
          //   this.menu = LEVEL02_MENUS;
          //   break;
          // }
          // case 'level03': {
          //   this.menu = LEVEL03_MENUS;
          //   break;
          // }
          // case 'level04': {
          //   this.menu = LEVEL04_MENUS;
          //   break;
          // }
        };
      }
    });

    // this.utilService.getFilterDates().then((response) => {
    //   let resultObj = response.json();

    //   if (resultObj.statusCode == '200' && resultObj.success == true) {
          
    //     this.utilService.prepareFilterDatesList(resultObj.result);
    //   }
    // });
  }
}
