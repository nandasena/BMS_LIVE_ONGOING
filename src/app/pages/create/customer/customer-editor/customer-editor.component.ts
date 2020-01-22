import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BiguserService } from "../.././../../services/biguser.service";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { SmartTableService } from "../../../../@core/data/smart-table.service";
import { AlertifyService } from "../.././../../services/alertify.service";
import { SettingsService } from "../.././../../services/settings.service";
import * as _ from "lodash";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: "customer-editor",
  templateUrl: "./customer-editor.component.html",
  styleUrls: ["./customer-editor.component.scss"]
})
export class CustomerEditorComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private biguserService: BiguserService,
    private service: SmartTableService,
    private alertifyService: AlertifyService,
    private settingsservice: SettingsService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {

  }

  closeModal() {

  }
}
