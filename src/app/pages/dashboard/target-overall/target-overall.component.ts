import { Component,OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import { UserService } from '../../../@core/data/users.service';
@Component({
  selector: 'target-overall',
  templateUrl: './target-overall.component.html',
  styleUrls: ['./target-overall.component.scss']
})
export class TargetOverallComponent implements OnInit {
  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  constructor(private userService: UserService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit(): void {
  }

}
