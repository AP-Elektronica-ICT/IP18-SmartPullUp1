import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    //save event to db
    this.viewCtrl.dismiss(this.event);
  }

}
