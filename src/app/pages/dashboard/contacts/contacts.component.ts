import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(private userService: UserService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit() {

    this.userService.getUsers()
      .subscribe((users: any) => {
        this.contacts = [
          {user: users.nick, type: 'Update sales team\'s strategies'},
          {user: users.eva, type: 'Introduce new flavor to market'},
          // {user: users.jack, type: 'Update network infrastructure'},
          // {user: users.lee, type: 'Add green items to lunch menu'},
          // {user: users.alan, type: 'Order suppliers 2 days early'},
          // {user: users.kate, type: 'Inprove office transport facility'},
        ];

        this.recent = [
          {user: users.alan, type: '7', time: '9:12 pm'},
          {user: users.eva, type: '9', time: '7:45 pm'},
          // {user: users.nick, type: '5', time: '5:29 pm'},
          // {user: users.lee, type: '3', time: '11:24 am'},
          // {user: users.jack, type: '9', time: '10:45 am'},
          // {user: users.kate, type: '8', time: '9:42 am'},
          // {user: users.kate, type: '8', time: '9:31 am'},
          // {user: users.jack, type: '7', time: '8:01 am'},
        ];
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
