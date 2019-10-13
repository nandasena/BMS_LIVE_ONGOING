import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'issue-summery',
  templateUrl: './issue-summery.component.html',
  styleUrls: ['./issue-summery.component.scss']
})
export class IssueSummeryComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
