import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { JsonService, DummyData } from '../../services/JsonService';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothConnectPage } from '../bluetooth-connect/bluetooth-connect';
import { ApiService } from '../../services/ApiService';
import { AuthenticationService } from '../../services/AuthenticationService';


@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
  providers: [JsonService]
})

export class ExercisePage {
  public PageTitle = 'Exercise';
  private percent = 0;
  private pullUpCounter = 0;
  private goal = 20;
  private pullUpsLabel = "Pull-Ups";
  private timeStamp = 0;
  private timeStampString = "0";
  private buttState = "Start";
  private running = false;
  private avgSpeed:any;

  private title = this.pullUpCounter + "/" + this.goal;
  private pullupArrayIterator = 0;


  private pullupArray: DummyData;
  private isConnected = false;

  private unpairedDevices: any;
  private pairedDevices: any;
  private loader: any;
  private userId: any;


  private NOBLUETOOTH = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private json: JsonService, private bluetooth: BluetoothSerial, private loadingCtrl: LoadingController, private modCtrl: ModalController, private api: ApiService, private auth: AuthenticationService) {
    // this.pullupArray = this.json.getData()
    // this.goal = this.pullupArray.array.length;

    bluetooth.isConnected().then((yes) => {
      this.isConnected = true;
    }, (no) => {
      this.isConnected = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
    this.loadProfile();
  }

  public loadProfile() {
    if (this.auth.isAuthenticated()) {
      this.userId = this.auth.user.sub;
      // console.log(userId);
      
    }
  }


  public showBluetoothList() {
    let modal = this.modCtrl.create(BluetoothConnectPage);
    modal.present();
  }

  public count() {
    this.pullUpCounter++;
    this.title = this.pullUpCounter + "/" + this.goal;
    this.percent = this.pullUpCounter / this.goal * 100;
    this.avgSpeed = String((this.timeStamp / this.pullUpCounter/ 10).toFixed(1));
    console.log(this.avgSpeed);
    if (this.percent >= 100) {
      this.running = false;
      this.showFinishedAlert();
    }
  }

  public showFinishedAlert() {
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
    this.startPause();
  }

  public startPause() {
    if (this.buttState == "Start") {
      this.buttState = "Pause";
      this.title = this.pullUpCounter + "/" + this.goal;
      this.running = true;
    } else {
      this.buttState = "Start";
      this.running = false;
    }
    this.timer();
  }

  public timer() {
    setTimeout(() => {
      if (this.running) {
        this.timeStamp = (this.timeStamp + 1);
        this.timeStampString = (this.timeStamp / 10).toFixed(1);
        this.timer();
        this.checkPullUps();
      }
    }, 100);
  }

  public stopped() {
    this.SendToDatabase(this.pullUpCounter);
    this.running = false;
    this.buttState = "Start";
    this.timeStamp = 0;
    this.timeStampString = "0";
    this.pullUpCounter = 0;
    this.percent = 0;
    this.title = this.pullUpCounter + "/" + this.goal;
  }



  //This is Dummydata code plis no judgy en delete when real data is hier


  public checkPullUps() {
    this.bluetooth.read().then((success) => {
      if(this.running)
        this.count();
        
      console.log(JSON.parse(success));
    }, (failed) => {
      console.log("Failed to read bluetooth data");
    });
    /*
    if (this.pullupArray.array[this.pullupArrayIterator].down == this.timeStamp / 10) {
      this.count();
      if (this.pullupArray.array.length) {
        this.pullupArrayIterator++;
      }

    }
    */
  }

  SendToDatabase(totalPullUps) {
    this.api.insertPullupSession('google-oauth2|116967247859714699456', Date.now(), this.timeStamp, this.avgSpeed, 68.5, this.percent, this.goal )
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

