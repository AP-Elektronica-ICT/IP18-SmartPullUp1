import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the BluetoothDeviceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bluetooth-device',
  templateUrl: 'bluetooth-device.html'
})
export class BluetoothDeviceComponent {

  public unpairedDevices: any;
  public pairedDevices: any;
  public gettingUnpairedDevices: Boolean;
  public gettingPairedDevices: Boolean;
  public isConnected: boolean;
  public bluetoothAddress: string;
  private loader: any;

  constructor(private bluetooth: BluetoothSerial, private loadingCtrl: LoadingController) {


  }

  showConnectingPopup() {
    this.loader = this.loadingCtrl.create({
      content: "Connecting to Karlo"
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
      this.unpairedDevices.forEach(device => {
        //Filter bluetooth devices which name contains 'Smart Pull-Up Bar' or something.
        if (!device.name.includes("Smart Pull-Up Bar")) {
          var indexPos = this.unpairedDevices.some(function (element, i) {
            if (element.name == device.name)
              return i;
          });
          this.unpairedDevices.splice(indexPos, 1, device);
        }
      });
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
