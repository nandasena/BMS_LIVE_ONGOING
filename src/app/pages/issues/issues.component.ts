import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IssueAddComponent } from './issue-add/issue-add.component';
import { IssueSummeryComponent } from './issue-summery/issue-summery.component';

@Component({
  selector: 'issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  showAddIssue() {
    const activeModal = this.modalService.open(IssueAddComponent, {size:'lg', container: 'nb-layout'});
  }

  showSummery() {
    const activeModal = this.modalService.open(IssueSummeryComponent, {size:'lg', container: 'nb-layout'});
  }
}
