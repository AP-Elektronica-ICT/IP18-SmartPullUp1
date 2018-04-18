import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Modal } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { JsonService, DummyData } from '../../services/JsonService';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothConnectPage } from '../bluetooth-connect/bluetooth-connect';


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

  private title = this.pullUpCounter + "/" + this.goal;
  private pullupArrayIterator = 0;


  private pullupArray: DummyData;
  public isConnected = false;

  private unpairedDevices: any;
  private pairedDevices: any;
  private loader: any;
  private bluetoothModal: Modal;


  private NOBLUETOOTH = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private json: JsonService, private bluetooth: BluetoothSerial, private loadingCtrl: LoadingController, private modCtrl: ModalController) {
    // this.pullupArray = this.json.getData()
    // this.goal = this.pullupArray.array.length;

    this.checkConnection();
    setInterval(this.checkConnection(), 5000);
  }

  public checkConnection() {
    this.bluetooth.isConnected().then((yes) => {
      this.isConnected = true;
    }, (no) => {
      this.isConnected = false;
    });
  }

  public setConnected() {
    this.isConnected = true;
    this.bluetooth.subscribe('}').subscribe((data) => {
      this.handleBluetooth(data);
    })
  }

  public handleBluetooth(data: any) {
    let pullupData: PullUpInt = JSON.parse(data);
    // console.log(pullupData);
    switch (pullupData.type) {
      case 'Measurement':
        if (this.running) {
          console.log('Pull-up detected: ' + JSON.stringify(pullupData));
          this.count();
        }
        break;
      default:
        console.log('False data: ');
        console.log(data);
    }
    // console.log(JSON.stringify(data));
  }

  public showBluetoothList() {
    this.bluetoothModal = this.modCtrl.create(BluetoothConnectPage, { parent: this });
    this.bluetoothModal.present();
  }

  public count() {
    this.pullUpCounter++;
    this.title = this.pullUpCounter + "/" + this.goal;
    this.percent = this.pullUpCounter / this.goal * 100;
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
    this.SendToDatabase();
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
    this.bluetooth.readUntil('}').then((success) => {
      // if(this.running && success != '')
      // this.count();

      // console.log(success)
      // console.log(JSON.parse(success));
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

  SendToDatabase() {
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
  type: string;
  start: number;
  up: number;
}

export interface DummyData {
  array: PullUpInt[];
}

