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
  printDetails;

  constructor(private modalService: NgbModal,private invoiceService:InvoiceService) {
  }

  ngOnInit() {
    // this.renderValue = this.value.toString().toUpperCase();
  }

  showAddMilestoneModal(){
      this.invoiceService.getInvoiceDetailForReprintById(this.rowData.id).then((response) => {
        console.log("result is===..........",response.json());
        let result  =response.json();
        if(result.statusCode==200 && result.success){
            this.printReprint(result.result)
        }
      })

  }

  printReprint(invoiceDetail) {
    let ItemList =invoiceDetail.itemList;
    var invoiceWindow = window.open("", "print-window");
    //invoiceWindow.document.open();
    for (var x = 0; x < ItemList.length; x++) {
        this.printDetails = this.printDetails + '<tr><td style="height:20px;width:33%;text-align:left;">' + ItemList[x].itemName + '</td><td style="height:20px;width:15%;text-align:right;">' +
        parseFloat(ItemList[x].price.toString()).toFixed(2).replace(/./g, function (c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      }) + '</td><td style="height:20px;width:14%;text-align:right;">' + ItemList[x].sellingQuantity + '</td>'+
      '</td><td style="height:20px;width:18%;text-align:right;">' +  parseFloat(ItemList[x].itemDiscount.toString()).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    }) + '</td>' +
      '</td><td style="height:20px;width:20%;text-align:right;">' + parseFloat(ItemList[x].total).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    }) + '</td>' +
      '</tr>'
    }

    invoiceWindow.document.write (
      '<div>' +
           `<table style="width:100%;">
                <br><br><br><br><br><br><br><br><br><br>
            
                <tr style="width:100%; height:50px; text-align:center;"><td >INVOICE</td></tr>
            </table>

            <br/>
            <br/> 
            <div class="row">
              <table  style=" margin-left:2%; width:100%;">
               <thead>
                <tr>
                  <th style="text-align:left;height:15px;width:30%;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspInvoice Number :
                  </th>
                  <th style="text-align:left;height:15px;width:20%;  ">`+ invoiceDetail.invoiceNumber +
                  `</th> 
                  <th style="text-align:left;height:15px;width:20%;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDate :
                  </th>
                  <th style="text-align:left;height:15px;width:30%; ">`+ invoiceDetail.invoiceDate +
                  `</th>
                </tr>
               </thead>
              </table>

        
             <table  style=" margin-left:2%; width:100%;">
              <thead>
               <tr>
                <th style="text-align:left;height: 15px; width:30%; ">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspCustomer Name :
                </th>
                <th style="text-align:left; height: 15px; width:70%;  ">`+ invoiceDetail.customerName +
                `</th>
               </tr>  
              </thead>

             </table>
            </div> <br/>
           

            <table  style="margin-left:11%;width:80%;text-align:right;">
            
              <tr>

                <th style="text-align:left;width:33%;">Discription
                </th>
                <th style="text-align:right;width:15%;">Unit Price
                </th> 
                <th style="text-align:right;width:14%;">Quantity
                </th>
                <th style="text-align:right;width:18%;">Discount (Rs)
                </th>
                <th style="text-align:right;width:20%;">Amount (Rs)
                </th>

              </tr>
            <tbody > `+ this.printDetails + `</tbody>
            </table> 


            <div class="row">

            <table style="margin-left:14%; width:77%;padding-top:50px;">
             <thead  > <tr>
             <th style= " text-align:right; height: 20px; width:48%;">Total
             </th>
            <th style=" text-align:right;height: 20px; width:24%;">`+ parseFloat(invoiceDetail.totalAmount+invoiceDetail.invoiceDiscount).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) +
        `</th></tr> 
              <tr>
              <th style=" text-align:right; height: 20px; width:48%; "> Discount
              </th>  
               <th style=" text-align:right;height: 20px; width:22%; ">`+ parseFloat(invoiceDetail.invoiceDiscount).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }) +
        `</th> 
               </tr>
               <tr>
               <th style="text-align:right; height: 20px; width:48%; ">Net Total
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
            <th style="text-align:center;height: 20px; width:55%;  ">
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
         <th style="text-align:center;height: 40px; width:90%;  ">
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