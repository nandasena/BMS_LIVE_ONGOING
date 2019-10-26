import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { InvoiceEditComponent } from '../invoice-edit/invoice-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomRenderComponent } from './custome-render.component';
import { InvoiceService } from '../../../services/invoice.service';
import { AlertifyService } from '../../../services/alertify.service';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  InvoiceList;

  settings = {
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
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {
      invoiceNumber: {
        title: 'Invoice NO',
        type: 'number',
      },
      customerName: {
        title: 'Customer Name',
        type: 'string',
      },
      totalAmount: {
        title: 'Total Amount',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      invoiceDiscount: {
        title: 'Invoice Discount',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      invoiceDateOfString: {
        title: 'Invoice Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private modalService: NgbModal, private invoiceService: InvoiceService, private alertify: AlertifyService) {

    let userId = 1;
    this.invoiceService.getInvoice(userId).then((response) => {
      let retunData = response.json();
      if (retunData.statusCode == 200) {
        this.InvoiceList = retunData.result;
        this.invoiceService.loadEditObject(this.InvoiceList);
      }
    });
  }

  ngOnInit() {
    this.invoiceService.getLoadedList().subscribe(invoiceList => {
      this.source.load(invoiceList);
    })
  }

  onEdit(event): void {
    this.showEditModal(event.data.id,event.data.invoiceNumber);
  }

  onDelete(event): void {
    this.alertify.success('Confirm Message');
  }

  showEditModal(id,invoiceNumber) {

    let options: any = {
      size: "lg modal-dialog my-modal",
      container: 'nb-layout',
      class: "my-modal",
      style:'padding: 117px'
    };
    
    const activeEditModal = this.modalService.open(InvoiceEditComponent,options);
    activeEditModal.componentInstance.invoiceId=id;
    activeEditModal.componentInstance.invoiceNumber=invoiceNumber;
  }

}
