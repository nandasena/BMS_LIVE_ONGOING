import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../services/invoice.service';


@Component({
  template: `
  <div class="extra-btn"><span (click)="showAddMilestoneModal()" style="cursor: pointer;"><i class="fa fa-print" style="zoom: 1.5;"></i></span></div>
  `,
})
export class InvoicePrintComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  printDetails:string ='';

  constructor(private modalService: NgbModal,private invoiceService:InvoiceService) {
  }

  ngOnInit() {
  }

  showAddMilestoneModal(){
      this.invoiceService.getInvoiceDetailForReprintById(this.rowData.id).then((response) => {
        let result  =response.json();
        if(result.statusCode==200 && result.success){
            this.printReprint(result.result)
        }
      })

  }

  printReprint(invoiceDetail) {
    let ItemList =invoiceDetail.itemList;
    console.log("Item list =======",ItemList);
    var invoiceWindow = window.open("", "print-window","height=200px,width=200px");
    for (var x = 0; x < ItemList.length; x++) {

        this.printDetails = this.printDetails + '<tr><td style="height:20px;width:51%;text-align:left;font-size:14px;padding-top:4px;">' + ItemList[x].itemName + '</td><td style="height:20px;width:21%;text-align:right;font-size:14px;padding-top:4px;">' +
        parseFloat(ItemList[x].price.toString()).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td><td style="height:15px;width:10%;text-align:right;font-size:14px;padding-top:4px;">' + ItemList[x].sellingQuantity + '</td>'+
      '</td><td style="height:20px;width:20%;text-align:right;font-size: 14px;padding-top:4px;">' + parseFloat((parseFloat(ItemList[x].price)* parseFloat(ItemList[x].sellingQuantity)).toString()).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td>' +
      '</tr>'
    }

    invoiceWindow.document.write (
      '<div width=80>' +
            `<table style="width:100%;">
            <br><br><br><br><br><br>
            <p style="font-size:14px;padding-left:25px;margin:2px;">`+ invoiceDetail.tempCustomerVO.firstName+` </p>
            <p style="font-size:14px;padding-left:25px;margin:2px;">`+ invoiceDetail.tempCustomerVO.address1+`</p>
            <p style="font-size:14px;padding-left:25px;margin:2px;">`+ invoiceDetail.tempCustomerVO.contactNumber+`</p>
            <p style="font-size:14px;padding-left:25px;margin:2px;">`+ invoiceDetail.invoiceDate+`</p>
            </table>
            <br><br><br>
            <br/>
            <br/> 
            <br/>
           

            <table  style="margin-left:1%;width:92%;text-align:right;padding-left:7px;">

            <tbody > `+ this.printDetails + `</tbody>
            </table> 


            <div class="row">

            <table style="margin-left:1%;width:92%;text-align:right;padding-left:7px;">
             <thead> 
             <tr>
             <th style= " text-align:left; height: 20px; width:48%;">Total
             </th>
            <th style=" text-align:right;height: 20px; width:24%;">`+ parseFloat(invoiceDetail.totalAmount+invoiceDetail.invoiceDiscount).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }) +
            `</th>
            
            </tr> 
              <tr>
              <th style=" text-align:left; height: 20px; width:48%; "> Discount
              </th>  
               <th style=" text-align:right;height: 20px; width:22%; ">`+ parseFloat(invoiceDetail.invoiceDiscount).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }) +
            `</th> 
               </tr>
               <tr>
               <th style="text-align:left; height: 20px; width:48%; ">Net Total
               </th> 
                <th style=" text-align:right;height: 20px; width:22%; ">`+ (parseFloat(invoiceDetail.totalAmount)).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }) +
            `</th>`
            +
            `</th> 
               </tr>
               <tr>
               <th style="text-align:left; height: 20px; width:48%; ">Advance Amount
               </th> 
                <th style=" text-align:right;height: 20px; width:22%; ">`+ (parseFloat(invoiceDetail.advanceAmount)).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }) +
            `</th>`
            +
            `</th> 
               </tr>
               <tr>
               <th style="text-align:left; height: 20px; width:48%; ">Balance Amount
               </th> 
                <th style=" text-align:right;height: 20px; width:22%; ">`+ (parseFloat(invoiceDetail.totalAmount) -parseFloat(invoiceDetail.advanceAmount) ).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }) +
                `</tr> 
              </thead>
              <tbody > 
              </tbody>
              </table>
             </div><br/>
         <script>
            setTimeout(function () { window.print(); }, 500);
          </script>
      </div>`
  
  )
   // setTimeout(function () { invoiceWindow.close(); }, 2000);
    this.printDetails ='';
  }
}