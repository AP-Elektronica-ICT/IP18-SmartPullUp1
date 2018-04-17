import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';



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



  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService) {

  }

  ionViewDidLoad() {

  }

  

}