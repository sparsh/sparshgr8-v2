import { Component } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resource } from '../../app.resource'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AlertDialog } from '../../healper/alert.dialog/alert.dialog.component';
import { ValidationService } from '../../validation.service'
import { PushNotificationService } from '../../pushNotification/push.service';
import { PushData } from '../../pushNotification/push.model';
declare var ga: Function;
@Component({
  templateUrl: './hire-me.component.html',
  providers: [PushNotificationService]
})
export class HireMeComponent {
  clicked: boolean = false;
  selectedOption: string;
  getInTouch: boolean = true;
  hireRefrence: FirebaseListObservable<any[]>;
  hire: any = {};
  regTokenArray: any = [];
  hireForm = new FormGroup({

    "name": new FormControl('', [Validators.required]),
    "email": new FormControl('', [Validators.required, ValidationService.emailValidator]),
    "projectTitle": new FormControl('', [Validators.required]),
    "message": new FormControl('', [Validators.required]),
    "paymentType": new FormControl('', [Validators.required]),
    "amount": new FormControl('', [Validators.required]),
    "platform": new FormControl('', [Validators.required])

  });

  constructor(public resource: Resource,
    public dialog: MdDialog,
    public pushService: PushNotificationService,
    af: AngularFireDatabase) {

    af.list('/regToken').subscribe(
      data => {
        if (data) {
          for (var i = 0; i < data.length; i++)
            this.regTokenArray.push(data[i].regToken);
        }
      },
      error => {
        //console.log("some error occured while getting data");

      }
    );
    this.hireRefrence = af.list('/hire');
  }

  submitContactValuesToServer(hire) {

    hire.time = +new Date();
    this.clicked = true;
    if (this.hireForm.valid) {

      this.hireRefrence.push(hire);

      let dialogRef = this.dialog.open(AlertDialog);

      if (navigator.onLine) {
        dialogRef.componentInstance['message'] = this.resource.hireSendSuccess;
        if (this.regTokenArray) {
          ga('send', {
            hitType: 'event',
            eventCategory: 'Contact Push',
            eventAction: 'Sent',
            eventLabel: "person " + hire.fullName
          });

          let pushData = new PushData();
          pushData.setTitle("Success! " + this.hire.name + " wants to hire you! ");
          pushData.setRequestedTask(1);

          this.pushService.sendPushNotification(pushData, this.regTokenArray);
        }
        this.hireForm.reset();
      }
      else
        dialogRef.componentInstance['message'] = this.resource.error;
      //submit values to server

      this.clicked = false;
    }
  }



  openLink(link: string) {
    var win = window.open(link, '_blank');
    win.focus();
  }


}


