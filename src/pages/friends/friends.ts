import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothService } from '../../services/BluetoothService';
import { AuthenticationService } from '../../services/AuthenticationService';



/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private bluetooth: BluetoothService, private auth: AuthenticationService) {
    
  }

  ionViewDidLoad() {
   
  }

  startScanning() {
    this.bluetooth.scanForDevices();
  }

  connectDevice(address: any) {
    this.bluetooth.connectDevice(address);
  }

  disconnectDevice(){
    this.bluetooth.disconnectDevice();
  }
 
}