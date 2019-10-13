import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable()

export class AlertifyService {

  constructor() { }

  confirm(title: string, message: string, okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {

      }

    }).setHeader('<em>' + title + '</em> ');
  }
  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message)
  }
  message(message: string) {
    alertify.message(message);
  }

  confirmUpdate(message: string, okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {

      }

    }).setHeader('<em>Update Confirmation</em> ');
  }

  alert(message) {
    alertify
      .alert(message, function () {

      }).setHeader('<em>Alert!!!</em> ');;

  }
  excelAlert(message) {
    alertify
      .alert(message, function () {

      }).setHeader('<em>Warning!</em> ');;

  }
}
