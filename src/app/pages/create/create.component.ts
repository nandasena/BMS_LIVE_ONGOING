import { Component, OnInit, Input } from '@angular/core';
// import { InviteUserComponent } from './invite-user/invite-user.component';
 import { CategoryEditorComponent } from './category/category-editor/category-editor.component';
 import { ItemEditorComponent } from './item/item-editor/item-editor.component';
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

  showCategoryEditorWindow() {
    this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(CategoryEditorComponent, {size:'lg', container: 'nb-layout'});
    editorModel.componentInstance.selectedTask = this.data;
  }
  showSubCategoryEditorWindow() {
    this.data.category = 'subCategory';
   const editorModel = this.modalService.open(CategoryEditorComponent, {size:'lg', container: 'nb-layout'});
   editorModel.componentInstance.selectedTask = this.data;
  }
  showItemEditorWindow() {
    //this.data.category = 'mainCategory';
    const editorModel = this.modalService.open(ItemEditorComponent, {size:'lg', container: 'nb-layout'});
    editorModel.componentInstance.selectedTask = this.data;
  }
}
