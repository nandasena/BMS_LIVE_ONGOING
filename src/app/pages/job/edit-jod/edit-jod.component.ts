import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../../../services/job.service';
import { Item } from '../../../models/item_modal';
import { Job } from '../../../models/job.model'
import { PriceList } from '../../../models/price-list.modal'
import { PaymentModal } from '../../../models/payment-modal';
import { InvoiceModel } from '../../../models/invoice-modal';
import { Customer } from '../../../models/customer_model';
import { AlertifyService } from '../../../services/alertify.service';
import * as moment from 'moment';
import { IMyDpOptions } from 'mydatepicker';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'edit-jod',
  templateUrl: './edit-jod.component.html',
  styleUrls: ['./edit-jod.component.scss']
})
export class EditJodComponent implements OnInit {

  jobList = [];
  selectedJob;
  otherExpenses = [];
  addedExpenses = [];
  selectedJobNo: number = -1;
  selectedJobName: string = '';
  SelectedJobItemList = [];
  receivedItemList = [];
  receivedQuantity: number = 0;
  selectedJobId: number = 0;
  constructor(private alertify: AlertifyService, private spinner: NgxSpinnerService, private el: ElementRef, private modalService: NgbModal, private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJobList().then(response => {
      this.jobList = response.json().result;
    });
    this.jobService.getAllRating().then((response) => {
      this.otherExpenses = response.json().result;
    })
  }

  getJobDetailsById(id) {
    console.log("Job Id ====", id);
    id = Number(id);
    this.selectedJobNo = id;
    if (id != -1) {
      let selectedJob = _.find(this.jobList, { 'jobId': id });
      this.selectedJobNo = selectedJob.jobNumber;
      this.selectedJobName = selectedJob.name;

      console.log("selectedJob ====", selectedJob);
      this.jobService.getJobById(id).then(response => {
        this.selectedJob = response.json().result;
      })
    }

  }

  addOtherExpenses(id) {
    if (this.selectedJobNo != -1) {
      if (id != -1) {
        id = Number(id);
        let name = (_.find(this.otherExpenses, { 'id': id })).name;
        let expensesTypeId = (_.find(this.otherExpenses, { 'id': id })).id;
        console.log("name ==", name);
        let length = this.addedExpenses.length;

        let expensess = { id: length + 1, "name": name, "description": "", "amount": 0,expensesTypeId:expensesTypeId};
        this.addedExpenses.push(expensess);
        console.log("AAAAAAAAAAA",this.addedExpenses);

      } else {
        this.alertify.error('Plase select expensess Type');
      }
    } else {
      this.alertify.error('Plase select job');
    }
  }
  changeDescription(id, description) {
    let foundItem = _.find(this.addedExpenses, { 'id': id })
    _.remove(this.addedExpenses, { 'id': id });
    foundItem.description = description;
    this.addedExpenses.push(foundItem);

  }
  changeAmount(id, amount) {
    let foundItem = _.find(this.addedExpenses, { 'id': id })
    _.remove(this.addedExpenses, { 'id': id });
    foundItem.amount = amount;
    this.addedExpenses.push(foundItem);


  }
  removeItem(id) {
    let test = this.addedExpenses
    _.remove(this.addedExpenses, { 'id': id });
    this.addedExpenses.forEach((expenses, index) => {
      expenses.id = ++index;
    });
  }

  addExpensess() {
    if (this.addedExpenses.length == 0) {
      this.alertify.error('Plase add expensess');
      return false;
    }
    if (this.selectedJobNo == -1) {
      this.alertify.error('Plase select job');
      return false;
    }

    let innerThis = this;
    this.alertify.confirm('Add Expenses', 'Are you sure you want to add expenses', function () {
      let job = new Job;
      job.jobId = innerThis.selectedJob.jobId;
      job.otherExpensesVOList = innerThis.addedExpenses;
      innerThis.jobService.saveExpenses(job).then(response => {

        if (response.json().statusCode == 200) {
          innerThis.alertify.success('Create successfull');
          innerThis.addedExpenses = [];
          innerThis.selectedJob = {};
          innerThis.jobService.getJobList().then(response => {
            innerThis.jobList = response.json().result;
          });
          innerThis.selectedJobNo = -1;

        } else {
          innerThis.alertify.error('Create un-successfull');
        }
      });
    });

  }
  getItemListById(id) {
    let SelectedJobItemList = [];
    this.SelectedJobItemList = [];
    this.receivedItemList = [];
    this.selectedJobId = 0;

    if (id != -1) {
      this.jobService.getJobById(id).then(response => {
        SelectedJobItemList = response.json().result.itemVOList;
        this.selectedJobId = response.json().result.jobId;

        SelectedJobItemList.forEach(element => {
          if (_.find(this.SelectedJobItemList, { 'itemId': element.itemId }) == null) {
            element.sellingQuantity = element.sellingQuantity - element.receivedQuantity;
            if(element.sellingQuantity !=0){
              this.SelectedJobItemList.push(element);
            }
            
          } else {
            let findItem = _.find(this.SelectedJobItemList, { 'itemId': element.itemId });
            _.remove(this.SelectedJobItemList, { 'itemId': element.itemId });
            findItem.sellingQuantity = findItem.sellingQuantity + element.sellingQuantity -element.receivedQuantity;
            if(findItem.sellingQuantity){
              this.SelectedJobItemList.push(findItem);
            }
            
          }
        });
      })
    } else {
      this.receivedItemList = [];
      this.SelectedJobItemList = [];
      this.receivedItemList = [];
      this.selectedJobId = 0;

    }
  }
  addReceviedItem(id) {
    id = Number(id);
    if (id != -1 && id != 0) {
      let findItem = _.find(this.SelectedJobItemList, { 'itemId': id });
      console.log("find Item", findItem);
      if (_.find(this.receivedItemList, { 'itemId': findItem.itemId }) == null) {
        this.receivedItemList.push(findItem);
        findItem.receivedQuantity = 1;
      }

    } else {
      this.alertify.error('Select Job');
    }
  }
  removeReceivedItem(id) {
    id = Number(id);
    if (_.find(this.receivedItemList, { 'itemId': id }) != null) {

      _.remove(this.receivedItemList, { 'itemId': id });
    }
  }

  addReceivedQTY(itemId, qty, event) {
    itemId = Number(itemId);
    qty = Number(qty);
    let findItem = _.find(this.receivedItemList, { 'itemId': itemId });
    _.remove(this.receivedItemList, { 'itemId': itemId });
    if (findItem.sellingQuantity >= qty) {

      findItem.receivedQuantity = qty;
      this.receivedItemList.push(findItem);
    } else {
      this.alertify.error('Quantity more than send quantity');
      findItem.receivedQuantity = 1;
      this.receivedItemList.push(findItem);
      event.target.value = 1;
    }
  }

  addReceivedItem() {
    if (this.selectedJobId == 0) {
      this.alertify.error('Please select job');
      return false;
    }
    if (this.receivedItemList.length == 0) {
      this.alertify.error('Add at lease one item');
      return false;
    }
    let innerThis = this;
    this.alertify.confirm('Add Received Item', 'Are you sure you want to add Item', function () {
      let job = new Job;
      job.jobId = innerThis.selectedJobId;
      job.itemVOList = innerThis.receivedItemList;
      console.log("Item List===",job);
      innerThis.jobService.addReceivedItem(job).then(response => {
        if (response.json().statusCode == 200) {
          innerThis.alertify.success('Create successfull');
          innerThis.jobService.getJobList().then(response => {
            innerThis.jobList = response.json().result;
          });
          innerThis.receivedItemList = [];
          innerThis.SelectedJobItemList = [];
          innerThis.receivedItemList = [];
          innerThis.selectedJobId = 0;

        } else {
          innerThis.alertify.error('Create un-successfull');
        }

      });

     });
  }

}
