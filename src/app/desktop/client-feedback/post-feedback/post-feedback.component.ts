import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resource } from '../../../app.resource'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AlertDialog } from '../../../healper/alert.dialog/alert.dialog.component';
declare var ga: Function;
import { PushNotificationService } from '../../../pushNotification/push.service';
import { PushData } from '../../../pushNotification/push.model';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.component.html',
  styleUrls: ['./post-feedback.component.scss'],
  providers: [PushNotificationService]
})
export class PostFeedbackComponent implements OnInit {


  ngOnInit() {
  }

  clicked: boolean = false;
  selectedOption: string;
  getInTouch: boolean = true;
  hireRefrence: FirebaseListObservable<any[]>;
  hire: any = {};
  regTokenArray: any = [];
  hireForm = new FormGroup({

    "name": new FormControl('', [Validators.required]),
    "projectTitle": new FormControl('', [Validators.required]),
    "message": new FormControl('', [Validators.required]),
    "marks": new FormControl('', [Validators.required])

  });

  constructor(public resource: Resource,
    public dialog: MdDialog,
    public pushService: PushNotificationService,
    af: AngularFireDatabase) {

    this.hire.marks = 5;
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
    this.hireRefrence = af.list('/clientFeedbacToBeApproveArray');
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
          pushData.setTitle(" Hey sparsh !" + hire.name + " gave you feedback, " + " marks " + hire.marks);
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


