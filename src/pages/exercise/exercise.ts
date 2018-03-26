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
  goal = 7;
  pullUpsLabel = "Pull-Ups";
  timeStamp = 0;
  timeStampString = "0";
  buttState = "Start";
  loop = false;
  public PageTitle = 'Exercise';
  title = this.pullUpCounter + "/" + this.goal;
  i =0;


  pullupArray: DummyData;



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private service: JsonService) {
    this.pullupArray = this.service.getData()
    this.goal = this.pullupArray.array.length;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }

  profileClicked() {
    console.log("Profile clicked!");
  }


  public Count() {
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
    this.SendToDatabase();
    this.loop = false;
    this.buttState = "Start";
    this.timeStamp = 0;
    this.timeStampString = "0";
    this.pullUpCounter = 0;
    this.percent = 0;
    this.title = this.pullUpCounter + "/" + this.goal;
  }



  //This is Dummydata code plis no judgy en delete when real data is hier


  public checkPullUps() {

    if(this.pullupArray.array[this.i].down == this.timeStamp/10){
      this.Count();
      if(this.pullupArray.array.length){
        this.i++;
      }

    }   
  }

  SendToDatabase(){
    var PullupJson = { 
      "UID": 2,
      "Pullups": this.pullUpCounter, 
      "Time": this.timeStamp,
      "Date": Date.now()
  }; 

    console.log("Sending " + PullupJson.Date + " Pull-Ups To the Database........DONE!");

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

