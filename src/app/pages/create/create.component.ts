import { Component, OnInit, Input } from '@angular/core';
// import { InviteUserComponent } from './invite-user/invite-user.component';
// import { CategoryEditorComponent } from './category-editor/category-editor.component';
// import { ItemEditorComponent } from './item-editor/item-editor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'settings',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  data = {
    category: '',
  }
  @Input() on = true;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
}