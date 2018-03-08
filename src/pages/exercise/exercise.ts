import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as data from '../../../json/pullup.json';




@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})


export class ExercisePage {

  percent = 0;
  pullUpCounter = 0;
  goal = 20;
  pullUpsLabel = "Pull-Ups";
  timeStamp = 0;
  timeStampString = "0";
  buttState = "Start";
  loop = false;
  public PageTitle = 'Exercise';
  title = this.counter + "/" + this.goal;

  pullup: pullUpInt;
  pulluparray: pullupArray;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private _http: HttpClient) {
    this.pulluparray = (<any>data);
    this.pullup = this.pulluparray[0];
    console.log(this.pulluparray);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }

  profileClicked() {
    console.log("Profile clicked!");
  }

  public loadJson(): Observable<pullupArray> {
    return this._http.get<pullupArray>("../../../json/pullup.json")

  }

  public clicked() {
    if (this.loop) {
      this.counter++;
      this.title = this.counter + "/" + this.goal;

      this.percent = this.counter/this.goal*100;
      if (this.percent == 100) {
        this.showAlert();
        this.completed();
      }
    }
  }

  public showAlert() {
    let alert = this.alertCtrl.create({
      title: 'You completed your workout!!',
      subTitle: 'Nice one! you did ' + this.goal + ' Pull-ups!',
      buttons: ['OK']
    });
    alert.present();
    this.timerClicked();
  }

  public timerClicked() {
    if (this.buttState == "Start") {
      this.buttState = "Pause";
      this.title = this.counter + "/" + this.goal;
      this.loop = true;
    } else {
      this.buttState = "Start";
      this.loop = false;
    }
    this.timer();
  }

  public timer() {
    setTimeout(() => {
      if (this.loop) {
        this.timeStamp = (this.timeStamp + 1);
        this.timeStampString = (this.timeStamp / 10).toFixed(1);
        this.timer();
      }
    }, 100);
  }

  public stopped() {
    this.loop = false;
    this.buttState = "Start";
    this.timeStamp = 0;
    this.timeStampString = "0";
    this.pullUpCounter = 0;
    this.percent = 0;
    this.title = this.counter + "/" + this.goal;

  }

  public completed() {
    this.loop = false;
    this.buttState = "Start";
    this.pullUpCounter = 0;
    this.percent = 0;
    this.timeStamp = 0;
    this.timeStampString = "0";
    this.title = this.counter + "/" + this.goal;
  }

}

interface pullupArray {

  value: pullUpInt[];

}

interface pullUpInt {
  type: String;
  up: String;
  down: String;

}