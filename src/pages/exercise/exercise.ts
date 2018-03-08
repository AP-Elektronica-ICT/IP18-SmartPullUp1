import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})


export class ExercisePage {

  percent = 0;
  counter = 0;
  goal = 20;
  pullUps = "Pull-Ups";
  timeStamp = 0;
  timeStampString = "0";
  buttState = "Start";
  loop = false;
  public PageTitle = 'Exercise';
  title = this.counter + "/" + this.goal;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }

  profileClicked() {
    console.log("Profile clicked!");
  }

  public Clicked() {
    if (this.loop) {
      this.counter++;
      this.title = this.counter + "/" + this.goal;

      this.percent = this.counter/this.goal*100;
      if (this.percent == 100) {
        this.showAlert();
        this.Completed();
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
    this.TimerClicked();
  }

  public TimerClicked() {
    if (this.buttState == "Start") {
      this.buttState = "Pause";
      this.title = this.counter + "/" + this.goal;
      this.loop = true;
    } else {
      this.buttState = "Start";
      this.loop = false;
    }
    this.Timer();
  }

  public Timer() {
    setTimeout(() => {
      if (this.loop) {
        this.timeStamp = (this.timeStamp + 1);
        this.timeStampString = (this.timeStamp / 10).toFixed(1);
        this.Timer();
      }
    }, 100);
  }

  public Stopped() {
    this.loop = false;
    this.buttState = "Start";
    this.timeStamp = 0;
    this.timeStampString = "0";
    this.counter = 0;
    this.percent = 0;
    this.title = this.counter + "/" + this.goal;

  }

  public Completed() {
    this.loop = false;
    this.buttState = "Start";
    this.counter = 0;
    this.percent = 0;
    this.timeStamp = 0;
    this.timeStampString = "0";
    this.title = this.counter + "/" + this.goal;
  }


}
