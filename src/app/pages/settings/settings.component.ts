import { Component, OnInit, Input } from '@angular/core';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input() on = true;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  showInviteModal() {
    const activeModal = this.modalService.open(InviteUserComponent, {size:'lg', container: 'nb-layout'});
  }
  showCategoryEditorWindow() {
    this.modalService.open(CategoryEditorComponent, {size:'lg', container: 'nb-layout'});
  }
}
