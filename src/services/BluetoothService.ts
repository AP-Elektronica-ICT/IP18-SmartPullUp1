import { Injectable } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { AlertController } from "ionic-angular";


@Injectable()
export class BluetoothService {

      public unpairedDevices: any;
      public pairedDevices: any;
      public gettingUnpairedDevices: Boolean;
      public gettingPairedDevices: Boolean;
      public isConnected: boolean;

      constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
            bluetoothSerial.enable();

            bluetoothSerial.isConnected().then((yes) => {
                  this.isConnected = true;
            },
                  (no) => {
                        this.isConnected = false;
                  }
            )
      }




      scanForDevices() {
            this.pairedDevices = null;
            this.unpairedDevices = null;
            this.gettingUnpairedDevices = true;
            this.gettingPairedDevices = true;
            this.bluetoothSerial.discoverUnpaired().then((success) => {
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

            this.bluetoothSerial.list().then((success) => {
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

      success = (data) => alert(data);
      fail = (error) => alert(error);

      connectDevice(address: any) {

            let alert = this.alertCtrl.create({
                  title: 'Connect',
                  message: 'Do you want to connect with?',
                  buttons: [
                        {
                              text: 'Cancel',
                              role: 'cancel',
                              handler: () => {
                                    console.log('Cancel clicked');
                              }
                        },
                        {
                              text: 'Connect',
                              handler: () => {
                                    this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
                                    this.isConnected = true;
                              }
                        }
                  ]
            });
            alert.present();

      }

      disconnectDevice() {
            let alert = this.alertCtrl.create({
                  title: 'Disconnect?',
                  message: 'Do you want to Disconnect?',
                  buttons: [
                        {
                              text: 'Cancel',
                              role: 'cancel',
                              handler: () => {
                                    console.log('Cancel clicked');
                              }
                        },
                        {
                              text: 'Disconnect',
                              handler: () => {
                                    this.bluetoothSerial.disconnect();
                                    this.isConnected = false;
                              }
                        }
                  ]
            });
            alert.present();
      }


}