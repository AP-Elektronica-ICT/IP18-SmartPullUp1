import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { ApiService } from '../../services/ApiService';

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

  user : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService, private api : ApiService) {
  }
  
  ionViewDidLoad() {
    this.api.getUserById('test').then(data => {
      this.user = data;
    });
    console.log('ionViewDidLoad ProfilePage');
  }
}
