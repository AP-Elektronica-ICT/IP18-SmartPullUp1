import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import * as moment from 'moment';
import { ApiService } from '../../services/ApiService';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService, private modalCtrl: ModalController, private alertCtrl: AlertController, private api: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  addEvent(){
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        this.saveEventToDb(data);
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onEventSelected(event){
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onCurrentDateChanged(event){
  }

  saveEventToDb(data) {
    let datafetch = {
      userid : this.auth.user.sub,
      starttime : moment(data.startTime).unix,
      endtime : moment(data.endTime).unix,
      allday : data.allday,
      title : data.title,
    }

    this.api.insertPullupSession(datafetch).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }
}
