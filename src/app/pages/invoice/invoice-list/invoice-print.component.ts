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
    var invoiceWindow = window.open("", "print-window","height=200px,width=200px");
    //invoiceWindow.document.open();
    for (var x = 0; x < ItemList.length; x++) {

        this.printDetails = this.printDetails + '<tr><td style="height:20px;width:51%;text-align:left;font-size:14px;padding-top:4px;">' + ItemList[x].itemName + '</td><td style="height:20px;width:21%;text-align:right;font-size:14px;padding-top:4px;">' +
        parseFloat(ItemList[x].price.toString()).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td><td style="height:15px;width:10%;text-align:right;font-size:14px;padding-top:4px;">' + ItemList[x].sellingQuantity + '</td>'+
      // '</td><td style="height:20px;width:10%;text-align:right;font-size: 14px;padding-top:4px;">' +  parseFloat(ItemList[x].itemDiscount.toString()).toFixed(2).replace(/./g, function (c, i, a) {
      //   return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      //   }) + '</td>' +
      '</td><td style="height:20px;width:20%;text-align:right;font-size: 14px;padding-top:4px;">' + parseFloat(ItemList[x].total).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) + '</td>' +
      '</tr>'
    }

    invoiceWindow.document.write (
 
      // NEW PRINT FORMAT////////////////////////////////////////// 

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
           

            <table  style="margin-left:8%;width:89%;text-align:right;">

            <tbody > `+ this.printDetails + `</tbody>
            </table> 


            <div class="row">

            <table style="margin-left:8%;width:89%;text-align:right;">
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
            `</th>
                </tr> 
              </thead>
              <tbody > 
              </tbody>
              </table>
             </div><br/>
             <div class="row" style="  ">
            <table  style="margin-left:2%; width:90%;">
            <thead  >
            <tr>
            <th style="text-align:right;height: 20px; width:25%; ">Authorized By :
            </th>
            <th style="text-align:left; height: 20px; width:10%;  ">`+ 'Pasan' +
            `</th>
            <th style="text-align:center;height: 20px; width:55%;">
            </th></tr>
            </thead>
            </table> 
         </div>
         <div class="row" style="  ">
         <table  style="margin-left:5%; width:90%;">
         <thead>
         <tr>
         <th style="text-align:center;height: 20px; width:90%;  ">Thank You.!
         </th></tr>
         <tr>
         <th style="text-align:center;height: 40px; width:90%;">
         </th></tr></thead>
         </table>
         </div>
         <script>
            setTimeout(function () { window.print(); }, 500);
          </script>
      </div>`
  
  )
    setTimeout(function () { invoiceWindow.close(); }, 1000);
    this.printDetails ='';
  }
}