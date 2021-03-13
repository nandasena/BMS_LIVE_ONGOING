import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';
  public notificationsIcon: boolean;
  displayName: string;
  userRole: string;

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private router: Router,
              private authService: NbAuthService,
              private analyticsService: AnalyticsService) {

                this.notificationsIcon = false;
                this.authService.onTokenChange()
              .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
          this.displayName = this.user.name;
          this.userRole = ' (' + this.user.userLevelName + ')';
        }
      });
                
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => {
        
    //     this.user = users.eva;
    //     console.log('USERSSS===', this.user);
    //   });

    let temp = this.menuService.onItemClick()
    .subscribe(clickedItem => {
      if (clickedItem.item.title == 'Log out') {
        localStorage.removeItem('auth_app_token');
        location.reload();
        this.router.navigate(['auth/logout']); 
      }
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
