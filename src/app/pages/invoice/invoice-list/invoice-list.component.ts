import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { InvoiceEditComponent } from '../invoice-edit/invoice-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomRenderComponent } from './custome-render.component';
import { InvoiceService } from '../../../services/invoice.service';
import { AlertifyService } from '../../../services/alertify.service';

@Component({
  selector: 'kpi-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  private kpiId: number;
  private kpiName: string;
  private uom: string;
  private description: string;
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
        type: 'string',
      },
      invoiceDateOfString: {
        title: 'Invoice Date',
        type: 'string',
      },
      // kpiValues: {
      //   title: 'Total Amount',
      //   type: 'string',
      // },
      // assignee: {
      //   title: 'Assignee',
      //   type: 'string',
      // },
      // button: {
      //   title: '',
      //   type: 'custom',
      //   renderComponent: CustomRenderComponent,
      // },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private modalService: NgbModal, private invoiceService: InvoiceService, private alertify: AlertifyService) {

    let userId = 1;
    this.invoiceService.getInvoice(userId).then((response) => {
      let retunData = response.json();
      if (retunData.statusCode == 200) {
        this.InvoiceList = retunData.result;
        console.log("invoce List is ====", this.InvoiceList)
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
    console.log('EDITTT===', event.data);
    this.kpiId = event.data.id;
    this.kpiName = event.data.name;
    this.uom = event.data.uom;
    this.description = event.data.description;
    this.showEditModal();
  }

  onDelete(event): void {
    this.alertify.success('Confirm Message');


  }

  showEditModal() {
    const activeEditModal = this.modalService.open(InvoiceEditComponent, { size: 'lg', container: 'nb-layout' });
    activeEditModal.componentInstance.kpiId = this.kpiId;
    activeEditModal.componentInstance.kipName = this.kpiName;
  }

}
