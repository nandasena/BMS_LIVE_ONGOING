import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
  }

  showNewJob(){
    this.router.navigate(['/pages/invoice-quotation']);
  }
  showEditJob(){
    this.router.navigate(['/pages/job-quotation']);
  }
  viewJobs(){
    this.router.navigate(['/pages/job-view']);
  }
}
