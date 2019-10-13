import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IssueAssignComponent } from '../issue-assign/issue-assign.component';

@Component({
    template: `
    <div style="text-align: center; color: #787878;"  onMouseOver="this.style.color='#40dc7e'"
    onMouseOut="this.style.color='#787878'" (click)="assignMember()"><i class="fa fa-user-plus fa-2" aria-hidden="true"></i></div>
    `,
})

export class AssignIssueBtnComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private modalService: NgbModal) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    assignMember() {
        const activeModal = this.modalService.open(IssueAssignComponent, { size: 'lg', container: 'nb-layout' });
    }

}