import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothConnectPage } from '../bluetooth-connect/bluetooth-connect';
import { ApiService } from '../../services/ApiService';
import { AuthenticationService } from '../../services/AuthenticationService';


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
  private avgSpeed:any = 0;
  private avgSpeedMs;

  private title = this.pullUpCounter + "/" + this.goal;

  public isConnected = true;
  
  private bluetoothModal: Modal;


  private NOBLUETOOTH = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private bluetooth: BluetoothSerial, private modCtrl: ModalController, private api: ApiService) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }

  public setConnected() {
    this.isConnected = true;
    this.bluetooth.subscribe('}').subscribe((data) => {
      this.handleBluetooth(data);
    })
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
        this.avgSpeedMs = (this.timeStamp/this.pullUpCounter).toFixed(0);
        this.avgSpeed = String((this.timeStamp / this.pullUpCounter/ 10).toFixed(1));
        this.timer();
        this.checkPullUps();
      }
    }, 100);
  }

  public stopped() {
    this.running = false;
    this.SendToDatabase();
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
    console.log("Date now: "+Date.now() + " AvgSpeed = " + this.avgSpeedMs+ "  "+this.percent + " "+this.timeStamp);
    
    let data = {
      userid : "google-oauth2|116967247859714699456",
      timestamp : Date.now(),
      amount : this.pullUpCounter,
      duration : this.timeStamp,
      avgspeed : parseInt(this.avgSpeedMs),
      weight : 111,
      completion : this.percent,
      goal : this.goal
    }
    console.log(data)
    this.api.insertPullupSession(data).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
    // console.log("Sending " + totalPullUps + " Pull-Ups To the Database........DONE!");
  }


}
