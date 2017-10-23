import { Component } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resource } from '../../app.resource'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AlertDialog } from '../../healper/alert.dialog/alert.dialog.component';
import { ValidationService } from '../../validation.service'
import { PushNotificationService } from '../../pushNotification/push.service'
import { PushData } from '../../pushNotification/push.model';
declare var ga: Function;
@Component({
  templateUrl: './contact.component.html',
  providers: [PushNotificationService]
})
export class ContactComponent {
  clicked: boolean = false;
  selectedOption: string;
  getInTouch: boolean = true;
  contactRefrence: FirebaseListObservable<any[]>;
  contact: any = {};
  regTokenArray: any = [];
  contactForm = new FormGroup({

    "fullName": new FormControl('', [Validators.required]),
    "message": new FormControl('', [Validators.required]),
    "email": new FormControl('', [Validators.required, ValidationService.emailValidator])

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
    this.contactRefrence = af.list('/contacts');
  }

  submitContactValuesToServer(contact) {

    contact.time = +new Date();
    this.clicked = true;
    if (this.contactForm.valid) {

      this.contactRefrence.push(contact);

      let dialogRef = this.dialog.open(AlertDialog);

      if (navigator.onLine) {
        dialogRef.componentInstance['message'] = this.resource.contactSendSuccess;
        if (this.regTokenArray) {
          ga('send', {
            hitType: 'event',
            eventCategory: 'Contact Push',
            eventAction: 'Sent',
            eventLabel: "person " + contact.fullName
          });
          let pushData = new PushData();
          pushData.setTitle(contact.fullName + ", submitted a contact request ");
          pushData.setRequestedTask(0);
          this.pushService.sendPushNotification(pushData, this.regTokenArray);
        }
        this.contactForm.reset();
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


