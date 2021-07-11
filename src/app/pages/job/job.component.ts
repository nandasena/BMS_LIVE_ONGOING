import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showNewJob(){
    this.router.navigate(['/pages/job-create']);
  }
  showEditJob(){
    this.router.navigate(['/pages/job-edit']);
  }
  viewJobs(){
    this.router.navigate(['/pages/job-view']);
  }

}
