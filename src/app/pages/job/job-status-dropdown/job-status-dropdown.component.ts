import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../../../services/job.service';
import { JwtHelper } from 'angular2-jwt';
import { AlertifyService } from '../../../services/alertify.service';
@Component({
  selector: 'job-status-dropdown',
  templateUrl: './job-status-dropdown.component.html',
  styleUrls: ['./job-status-dropdown.component.scss']
})
export class JobStatusDropdownComponent implements OnInit {

  @Input() jobId: any;
  @Input() statusId: any;
  userInfor;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private activeModal: NgbActiveModal, private jobService: JobService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
  changeStatus(jobStatusId) {
    jobStatusId = Number(jobStatusId);
    this.userInfor = this.jwtHelper.decodeToken(localStorage.getItem('auth_app_token'))
    console.log("User Infor======New", this.userInfor.roleId);
    if (jobStatusId != -1) {
      if (this.statusId == 5 || this.statusId == 3) {
        if (this.userInfor.roleId == 1) {
          this.jobService.changeJobStatus(this.jobId, jobStatusId).then(response => {
            let retunData = response.json();
            let result = { "isTrue": retunData.result, "selectedId": jobStatusId }
            this.activeModal.close(result);
          })
        } else {
          this.alertify.error('Can not change status after set finished or cancel');
          return false;
        }
      }

      this.jobService.changeJobStatus(this.jobId, jobStatusId).then(response => {
        let retunData = response.json();
        let result = { "isTrue": retunData.result, "selectedId": jobStatusId }
        this.activeModal.close(result);
      })
    } else {

    }


  }

}
