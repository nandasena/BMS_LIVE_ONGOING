import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JobService} from '../../../services/job.service';
@Component({
  selector: 'job-status-dropdown',
  templateUrl: './job-status-dropdown.component.html',
  styleUrls: ['./job-status-dropdown.component.scss']
})
export class JobStatusDropdownComponent implements OnInit {

  @Input() jobId: any;
  @Input() statusId: any;
  constructor(private activeModal: NgbActiveModal,private jobService:JobService) { }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.close();
  }
  changeStatus(jobStatusId){
    jobStatusId =Number(jobStatusId);
    if(jobStatusId!=-1){
      this.jobService.changeJobStatus(this.jobId,jobStatusId).then(response=>{
        let retunData = response.json();
        let result ={"isTrue":retunData.result,"selectedId":jobStatusId}
        this.activeModal.close(result);
  
      })
    }else{

    }
    

  }

}
