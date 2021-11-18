import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AlertifyService } from '../../../services/alertify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobStatusDropdownComponent } from '../job-status-dropdown/job-status-dropdown.component';
import { JobService } from '../../../services/job.service';
import { } from '@nebular/theme';
import * as _ from 'lodash';
@Component({
  selector: 'job-status-change',
  templateUrl: './job-status-change.component.html',
  styleUrls: ['./job-status-change.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class JobStatusChangeComponent implements OnInit {

  @Input() rowData: any;
  buttonName;
  badgeClass: string;
  cursorType: any;
  jobId;
  statusId;
  jobList =[];
  constructor(private alertify: AlertifyService, private modalService: NgbModal,private jobService:JobService) { }

  ngOnInit() {
    console.log("Button Data", this.rowData);
    this.jobId = this.rowData.jobId;
    this.statusId = this.rowData.statusId;
    console.log("Status is ===", this.statusId)
    this.buttonName = this.rowData.status;
    if (this.statusId == 1) {
      this.badgeClass = 'badge badge-primary';
    }else if(this.statusId == 2){
      this.badgeClass = 'badge badge-info';
    }else if(this.statusId == 3){
      this.badgeClass = 'badge badge-success';
    }else if(this.statusId == 4){
      this.badgeClass = 'badge badge-warning';
    }else if(this.statusId == 5){
      this.badgeClass = 'badge badge-danger';
    }

  }
  test() {
    //  this.alertify.confirm('Change Status', 'Are you sure you want to create invoice', function () {});
    this.showEditModal();
  }

  showEditModal() {
    let options: any = {
      size: "sm modal-dialog my-modal",
      container: 'nb-layout',
      class: "xxx",
      style: 'padding: 117px',
      backdrop : 'static',
      keyboard : false
    };

    const activeEditModal = this.modalService.open(JobStatusDropdownComponent, options);
    activeEditModal.componentInstance.jobId = this.jobId;
    activeEditModal.componentInstance.statusId = this.statusId;

    activeEditModal.result.then((result) => {
      if (result) {
       if(result.isTrue){
       let selectedId = Number(result.selectedId);    
        this.jobService.getModifiedJobList().subscribe(response=>{
          this.jobList =response
          let selectedJob = _.find(this.jobList, { 'jobId': this.jobId })
          if(selectedJob!=null){
            _.remove(this.jobList, { 'jobId': this.jobId });
            selectedJob.statusId =selectedId;
            if(selectedId==1){
              selectedJob.status ="CREATE"
            }else if(selectedId==2){
              selectedJob.status ="START"
            }else if(selectedId==3){
              selectedJob.status ="FINISHED"
            }else if(selectedId==4){
              selectedJob.status ="PENDING"
            }else if(selectedId==5){
              selectedJob.status ="CANCELED"
            }
            this.jobList.push(selectedJob);

          }
         
        })

        this.alertify.success('Status successfully updated');
        this.jobService.loadModifiedJobList(this.jobList);
       
       }
      }
      });
  }
}
