import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
//import { AuthenticationService } from '../../services/AuthenticationService';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  // temporary turn off auth: private auth: AuthenticationService
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  GoToRegistration(){
    this.navCtrl.setRoot(RegistrationPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
