import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';



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

  public FacebookConnected = false;
  public userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService, private fb: Facebook) {

  }

  ionViewDidLoad() {
    this.hasFacebookConnection();
  }

  hasFacebookConnection() {
    this.fb.getLoginStatus().then((success) => {
      if(success.status != 'connected'){
        this.FacebookConnected = false;
      } else {
        this.FacebookConnected = true;
        this.getUserData();
      }
    }, (failed) => {
      console.log('connection failed');
    })
  
  }

  getUserData() {
    this.fb.api('me?fields=id,name,first_name,email,friends', []).then(profile => {
      this.userData = {first_name: profile['first_name'], username: profile['name'], email: profile['email'], friends: profile['friends']}
      console.log(this.userData);
    }, error => {
      console.log("Failed! " + error);
    });
  }

  loginFacebook() {
    // console.log('Status: ' + this.fb.getLoginStatus());
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => { 
        
      this.hasFacebookConnection();
      // console.log('Status: ' + this.fb.getLoginStatus());
    })
    .catch(e => {
      this.hasFacebookConnection();
      console.log('Error logging into Facebook', e)
    });
  }

  logoutFacebook() {
    this.fb.logout().then((success) => {
      this.FacebookConnected = false;
      this.userData = "";
      console.log("Successfully logged out");
    }, (failed) => {
      console.log("Failed to log out")
    });
  }

  

}