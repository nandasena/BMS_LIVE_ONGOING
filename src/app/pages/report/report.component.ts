import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
  }

  showProfitOnInvoicel(){
    this.router.navigate(['/pages/profit-on-invoice']);
  }
  showItemWisereport(){
    this.router.navigate(['/pages/item-wise-profit']);
  }

}
