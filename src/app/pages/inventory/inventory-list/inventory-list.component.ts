import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../../../services/inventory.service';
import { Item } from '../../../models/item_modal';
import { InventoryIssueBtnComponent } from './inventory-issue-btn-component';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  inventoryList: Item[] = [];

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
    pager: {
      display: true,
      perPage: 15
    },
    columns: {
      itemId: {
        title: 'Item Id',
        type: 'number',
      },
      itemCode: {
        title: 'Item Id',
        type: 'number',
      },
      name: {
        title: 'Item Name',
        type: 'string',
      },
      cost: {
        title: 'Item Cost',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      fabricatorPrice: {
        title: 'Fabrication Price',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      price: {
        title: 'MRP Price',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      availableQuantity: {
        title: 'quantity',
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat("ja-JP",{style: "decimal", currency: "JPY", minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)}
      },
      // button: {
      //   title: '',
      //   type: 'custom',
      //   renderComponent: InventoryIssueBtnComponent
      // }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private inventoryService: InventoryService, private modalService: NgbModal) {
    this.inventoryService.getAllItem().then(response => {
      let itemList = response.json().result;
      itemList.forEach(item => {
          item.itemDetailList.forEach(itemDetail => {
            let tempItem = new Item();
            tempItem.itemId = item.itemId;
            tempItem.name = item.itemName;
            tempItem.availableQuantity = itemDetail.availableQuantity
            tempItem.cost = itemDetail.costPrice;
            tempItem.fabricatorPrice = itemDetail.fabricatorPrice;
            tempItem.price=itemDetail.mrpPrice;
            tempItem.availableQuantity=itemDetail.availableQuantity;
            tempItem.itemCode=item.itemCode;
            this.inventoryList.push(tempItem);
          });
      });

      this.source.load(this.inventoryList);
    });

  }

  ngOnInit() {
  }

}
