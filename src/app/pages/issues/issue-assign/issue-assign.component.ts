import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'issue-assign',
  templateUrl: './issue-assign.component.html',
  styleUrls: ['./issue-assign.component.scss']
})
export class IssueAssignComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
