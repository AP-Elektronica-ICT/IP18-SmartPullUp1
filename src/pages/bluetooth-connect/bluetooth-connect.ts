import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

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

  public BTDEBUG = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bluetooth: BluetoothSerial, private loadingCtrl: LoadingController) {
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
      this.loader.dismiss();
    }, (err) => {
      this.loader.dismiss();
      console.log("connecting to bluetooth device failed");
    });

  }

}
