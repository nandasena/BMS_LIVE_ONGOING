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
import { Customer } from "../../../../models/customer_model";



@Component({
  selector: "customer-editor",
  templateUrl: "./customer-editor.component.html",
  styleUrls: ["./customer-editor.component.scss"]
})
export class CustomerEditorComponent implements OnInit {
  @Input() selectedTask;
  firstName:string;
  lastName:string;
  email:string;
  phoneNumber: string;
  address1:string;
  address2:string;
  address3:string;
  NICNumber:string;
  selectedType:string;
  customerDetailsList:Customer[] = [];
  supplierDetailsList:Customer[] = [];
  remark:string;
  customerCreate:boolean;
  supplierCreate:boolean;
  

  branchList=[];
  branch ={
    id:-1,
    name:'Select Branch'
  };
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

    this.settingsservice.getBranchList().then(response => {
      this.branchList = response.json().result;
    });
    if (this.selectedTask == "Customer_create") {
      this.selectedType="Customer"
      this.customerCreate = true;
      this.supplierCreate = false;
    } else {
      this.customerCreate = false;
      this.supplierCreate = true;
      this.selectedType="Supplier"
    }
  }

  closeModal() {
    this.activeModal.close();
  }
  selectBranch(branch){
    this.branch =branch;
  }
  save(){
 
    
      if (this.branch.id ==-1) {
        this.alertifyService.warning("Please add branch.");
        return false;
      }
      if (this.firstName == "" || this.firstName == null) {
        this.alertifyService.warning("Please add first name.");
        return false;
      }
      if (this.lastName == "" || this.lastName == null) {
        this.alertifyService.warning("Please add Last name.");
        return false;
      }
      if (this.email == "" || this.email == null) {
        this.alertifyService.warning("Please add email.");
        return false;
      }
      if (this.phoneNumber == "" || this.phoneNumber == null) {
        this.alertifyService.warning("Please add phone number.");
        return false;
      }
      if (this.address1 == "" || this.address1 == null) {
        this.alertifyService.warning("Please add address 1.");
        return false;
      }
      if (this.address2 == "" || this.address2 == null) {
        this.alertifyService.warning("Please add address 2.");
        return false;
      }
      if (this.address3 == "" || this.address3 == null) {
        this.alertifyService.warning("Please add address 3.");
        return false;
      }
      if (this.NICNumber == "" || this.NICNumber == null) {
        this.alertifyService.warning("Please add NIC number.");
        return false;
      }
      if (this.remark == "" || this.remark == null) {
        this.alertifyService.warning("Please add remark.");
        return false;
      }

      if (this.customerCreate) {
      let innerThis = this;
      this.alertifyService.confirm('Create New Customer', 'Are you sure you want to create Customer', function () {
        let customerDetails : Customer = {
          supplierId:0,
          customerId:0, 
          firstName:innerThis.firstName,
          lastName:innerThis.lastName,
          email:innerThis.email,
          address1:innerThis.address1,
          address2:innerThis.address2,
          address3:innerThis.address3,
          contactNumber:innerThis.phoneNumber,
          NIC:innerThis.NICNumber,
          remark:innerThis.remark,
          name:"",
          branchId:innerThis.branch.id,
        };
        innerThis.customerDetailsList.push(customerDetails);
        innerThis.spinner.show();
        innerThis.settingsservice.saveCustomer(innerThis.customerDetailsList).then(response => {
        let resultObj = response.json();
        if (resultObj.statusCode === 200 && resultObj.success) {
          innerThis.spinner.hide();
          innerThis.alertifyService.success("Create successfull");
          innerThis.settingsservice.getCustomerList().then((response) => {
            let init_data = response.json().result;
            innerThis.settingsservice.loadCustomerList(init_data);
            innerThis.closeModal();

          }).catch((ex) => {
            let init_data;
          });
          innerThis.closeModal();
        } else {
          innerThis.spinner.hide();
          innerThis.alertifyService.error("Create un-successfull");
          innerThis.closeModal();
        }
      });
      });
    }else if(this.supplierCreate){
      let innerThis = this;
      this.alertifyService.confirm('Create New Supplier', 'Are you sure you want to create Supplier', function () {
        let supplierDetails : Customer = {
          supplierId:0,
          customerId:0, 
          firstName:innerThis.firstName,
          lastName:innerThis.lastName,
          email:innerThis.email,
          address1:innerThis.address1,
          address2:innerThis.address2,
          address3:innerThis.address3,
          contactNumber:innerThis.phoneNumber,
          NIC:innerThis.NICNumber,
          remark:innerThis.remark,
          name:"",
          branchId:innerThis.branch.id,
        };
        innerThis.supplierDetailsList.push(supplierDetails);
        innerThis.spinner.show();

        innerThis.settingsservice.saveSupplier(innerThis.supplierDetailsList).then(response => {
          let resultObj = response.json();
          if (resultObj.statusCode === 200 && resultObj.success) {
            innerThis.spinner.hide();
            innerThis.alertifyService.success("Create successfull");
            innerThis.settingsservice.getSupplierList().then((response) => {
              let init_data = response.json().result;
              innerThis.settingsservice.loadSupplierList(init_data);
              innerThis.closeModal();
  
            }).catch((ex) => {
              let init_data;
            });
            innerThis.closeModal();
          } else {
            innerThis.spinner.hide();
            innerThis.alertifyService.error("Create un-successfull");
            innerThis.closeModal();
          }
        });

      });
    }

  }
onlyEnterCharacters(event)
{  
  const pattern = /^[a-zA-Z \-\']+/;
    let inputChar = String.fromCharCode(event.charCode);
       if (!pattern.test(inputChar)) {
           event.preventDefault();
      }
}
}
