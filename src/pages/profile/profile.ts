import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
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


  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService, private api: ApiService) {
  }

  ionViewDidLoad() {
   this.loadProfile();
  }

  ionViewWillEnter() {
    this.loadProfile();
  }

 public loadProfile() {
    if (this.auth.isAuthenticated()) {
      let userId = this.auth.user.sub;
      // console.log(userId);

      this.api.getUserById(userId).then(data => {
        this.user = data;
      });
      
    }
    console.log('ionViewDidLoad ProfilePage');
  }
}
