import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import { AlertifyService } from '../../../services/alertify.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import * as moment from 'moment';
import { JobService } from '../../../services/job.service';
import { JobDetailComponent } from '../job-detail/job-detail.component';
import { JobStatusChangeComponent } from '../job-status-change/job-status-change.component';
import * as _ from 'lodash';
@Component({
  selector: 'view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  fromDate;
  toDate;
  model = { date: {}, formatted: '' };
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  constructor(private jobService: JobService, private modalService: NgbModal) {

    let tempDate = moment().subtract(21, 'days').calendar().split('/');
    this.fromDate = {
      "date": {
        year: tempDate[2],
        month: parseInt(tempDate[0]),
        day: parseInt(tempDate[1])
      },
      formatted: tempDate[2] + '-' + parseInt(tempDate[0]) + '-' + parseInt(tempDate[1])
    }

    this.toDate = {
      "date": {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date()
      },
      formatted: moment().year() + '-' + (moment().month() + 1) + '-' + moment().date()
    }

    this.jobService.getJobDetailsByDate(this.fromDate.formatted, this.toDate.formatted).then((response) => {
      let retunData = response.json();
      if (retunData.statusCode == 200) {
        jobService.loadModifiedJobList(retunData.result);

      }
    });

    this.jobService.getModifiedJobList().subscribe(response => {
      let orderedJobList =_.orderBy(response,['jobId'],['desc']);
      this.source.load(orderedJobList);
    })

  }

  ngOnInit() {

  }

  jobDetails = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: 'right',
    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="fa fa-arrows-alt"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 15
    },

    columns: {
      jobNumber: {
        title: 'Job NO',
        type: 'number',
      },
      name: {
        title: 'Job Name',
        type: 'string',
      },
      paymentType: {
        title: 'Payment Type',
        type: 'string',
      },
      cost: {
        title: 'Total Cost',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      amount: {
        title: 'Total Amount',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      jobProfit: {
        title: 'Profit',
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat("ja-JP", { style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) }
      },
      print: {
        title: '',
        type: 'custom',
        renderComponent: JobStatusChangeComponent
      },
    },
  };

  getjobByDate() {
    this.jobService.getJobDetailsByDate(this.fromDate.formatted, this.toDate.formatted).then((response) => {
      let retunData = response.json();
      console.log("Job Details======= ",retunData.result);
      if (retunData.statusCode == 200) {
        this.jobService.loadModifiedJobList(retunData.result);
      }
    });
  }
  viewJobDetails(event) {
    console.log("Event data", event.data);
    this.showEditModal(event.data.itemVOList, event.data.jobNumber);
  }

  showEditModal(itemList, jobNumber) {
    let options: any = {
      size: "lg modal-dialog my-modal",
      container: 'nb-layout',
      class: "xxx",
      style: 'padding: 117px'
    };

    const activeEditModal = this.modalService.open(JobDetailComponent, options);
    activeEditModal.componentInstance.itemList = itemList;
    activeEditModal.componentInstance.jobNumber = jobNumber;
  }


}
