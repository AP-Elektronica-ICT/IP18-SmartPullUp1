import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ExercisePage } from '../exercise/exercise';

/**
 * Generated class for the BluetoothConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth-connect',
  templateUrl: 'bluetooth-connect.html',
})
export class BluetoothConnectPage {

  private unpairedDevices: any;
  private pairedDevices: any;
  private gettingUnpairedDevices: Boolean;
  private gettingPairedDevices: Boolean;
  public isConnected: boolean;
  public bluetoothAddress: string;
  private loader: any;
  private parent: ExercisePage;

  public BTDEBUG = false;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private bluetooth: BluetoothSerial, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
   this.parent = navParams.get('parent');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothConnectPage');
  }

  showConnectingPopup() {
    this.loader = this.loadingCtrl.create({
      content: "Connecting to Smart Pull-Up Bar"
    });
    this.loader.present();
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingUnpairedDevices = true;
    this.gettingPairedDevices = true;
    this.bluetooth.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingUnpairedDevices = false;
      success.forEach(element => {
        console.log("Unpaired device: " + element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetooth.list().then((success) => {
      this.pairedDevices = success;
      this.gettingPairedDevices = false;
      success.forEach(element => {
        console.log("Paired device: " + element.name);
      })
    },
      (err) => {
        console.log(err);
      })
  }

  directConnect(){
    this.connectDevice(this.bluetoothAddress);
  }

  connectDevice(address: any) {
    this.showConnectingPopup();
    this.bluetooth.connect(address).subscribe((data) => {
      console.log(data);
      this.isConnected = true;
      this.loader.dismiss();
      this.viewCtrl.dismiss();
      this.showConnected();
      this.parent.setConnected();
    }, (err) => {
      this.loader.dismiss();
      this.showDisconnected();
      this.parent.setDisconnected();
      console.log("connecting to bluetooth device failed");
    });

  }

  showConnected() {
    let toast = this.toastCtrl.create({
      message: 'Success!',
      duration: 2000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  showDisconnected() {
    let toast = this.toastCtrl.create({
      message: 'Disconnected!',
      duration: 2000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
