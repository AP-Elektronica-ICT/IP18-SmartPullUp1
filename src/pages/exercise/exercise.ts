import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { JsonService, DummyData } from '../../services/JsonService';


@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
  providers: [JsonService]
})

export class ExercisePage {
  percent = 0;
  pullUpCounter = 0;
  goal = 1;
  pullUpsLabel = "Pull-Ups";
  timeStamp = 0;
  timeStampString = "0";
  buttState = "Start";
  loop = false;
  public PageTitle = 'Exercise';
  title = this.pullUpCounter + "/" + this.goal;


  pullupArray: DummyData;
  pullup1;
  pullup2;
  pullup3;
  pullup4;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private service: JsonService) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
    this.pullupArray = this.service.getData()
    this.loadPullUps();
  }

  profileClicked() {
    console.log("Profile clicked!");
  }


  public clicked() {
    this.pullUpCounter++;
    this.title = this.pullUpCounter + "/" + this.goal;
    this.percent = this.pullUpCounter / this.goal * 100;
    if (this.percent == 100) {
    this.loop= false;
      this.showAlert();
    }

  }

  public showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Complete!',
      subTitle: 'Nice one! you did ' + this.goal + ' Pull-ups!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.stopped();
          }
        }
      ]
    });
    alert.present();
    this.timerClicked();
  }

  public timerClicked() {
    if (this.buttState == "Start") {
      this.buttState = "Pause";
      this.title = this.pullUpCounter + "/" + this.goal;
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
        this.checkPullUps();
      }
    }, 100);
  }

  public stopped() {
    this.SendToDatabase(this.pullUpCounter);
    this.loop = false;
    this.buttState = "Start";
    this.timeStamp = 0;
    this.timeStampString = "0";
    this.pullUpCounter = 0;
    this.percent = 0;
    this.title = this.pullUpCounter + "/" + this.goal;
  }



  //This is Dummydata code plis no judgy en delete when real data is hier
  public loadPullUps() {
    this.pullup1 = this.pullupArray.array[0].down;
    this.pullup2 = this.pullupArray.array[1].down;
    this.pullup3 = this.pullupArray.array[2].down;
    this.pullup4 = this.pullupArray.array[3].down;
  }

  public checkPullUps() {

    switch (this.timeStamp/10) {
      case this.pullup1:{
        this.clicked();
        break;
      }
      case this.pullup2:{
        this.clicked();
        break;
      }
      case this.pullup3:{
        this.clicked();
        break;
      }
      case this.pullup4:{
        this.clicked();
        break;
      }
    }
  }
  SendToDatabase(totalPullUps){
    console.log("Sending " + totalPullUps + " Pull-Ups To the Database........DONE!");
  }


}

export interface PullUpInt {
  Type: string;
  up: number;
  down: number;
}

export interface DummyData {
  array: PullUpInt[];
}

