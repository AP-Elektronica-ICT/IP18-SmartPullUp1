import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthenticationService } from '../../services/AuthenticationService';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthenticationService]
})
export class LoginPage {

  public isAuthenticated = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private auth: AuthenticationService) {
  }

  ionViewDidEnter() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
