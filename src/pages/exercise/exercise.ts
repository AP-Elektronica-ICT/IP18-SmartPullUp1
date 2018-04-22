import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothConnectPage } from '../bluetooth-connect/bluetooth-connect';


@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})

export class ExercisePage {
  public PageTitle = 'Exercise';
  private percent = 0;
  private pullUpCounter = 0;
  private goal = 20;
  private timeStamp = 0;
  private timeStampString = "0";
  private weightString = "";
  private buttState = "Start";
  private running = false;

  private title = this.pullUpCounter + "/" + this.goal;

  public isConnected = false;
  
  private bluetoothModal: Modal;


  // private NOBLUETOOTH = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private bluetooth: BluetoothSerial, private modCtrl: ModalController) {
    // this.pullupArray = this.json.getData()
    // this.goal = this.pullupArray.array.length;
  }
  
  ionViewWillEnter() {
    this.checkConnection();
  }

  checkConnection() {
    this.bluetooth.isConnected().then((yes) => {
      this.isConnected = true;
      console.log(yes);
    }, (no) => {
      this.isConnected = false;
      console.log(no);
    });
  }

  public setConnected() {
    this.isConnected = true;
    this.bluetooth.subscribe('}').subscribe((data) => {
      this.handleBluetooth(data);
    })
  }

  public setDisconnected() {
    this.isConnected = false;
    this.bluetooth.clear().then((yes) => {
      console.log('Cleared bluetooth buffer');
    });
    this.bluetooth.disconnect().then((yes) => {
      console.log("Disconnected")
    });
  }

  public handleBluetooth(data: any) {
    let pullupData = JSON.parse(data);
    // console.log(pullupData);
    switch (pullupData.Type) {
      case 'Initial':
        this.weightString = pullupData.Weight;
      break;
      case 'Measurement':
        if (this.running) {
          console.log('Pull-up detected: ' + JSON.stringify(pullupData));
          this.count();
        }
        break;
      default:
        console.log('False data: ');
        console.log(data);
        break;
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

export interface InitInt {
  Type: string;
  Weight: number;
}
export interface PullUpInt {
  Type: string;
  Start: number;
  Up: number;
}

export interface DummyData {
  array: PullUpInt[];
}

