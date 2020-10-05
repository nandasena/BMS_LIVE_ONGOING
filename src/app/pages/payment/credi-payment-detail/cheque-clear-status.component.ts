import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <div>
      <span class="{{badgeClass}}"  [ngStyle]="{'cursor':cursorType}">{{buttonName}}</span>
    </div>`,
  })

  export class ChequeClearStatusComponent implements OnInit {

    @Input() rowData: any;
    buttonName;
    badgeClass: string;

    constructor() { }
    
    ngOnInit() {
        this.buttonName = 'Pending';
        this.badgeClass = 'badge badge-info';
    }
    

  
  }