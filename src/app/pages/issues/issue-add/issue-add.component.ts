import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.scss']
})
export class IssueAddComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
