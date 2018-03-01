import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the ProfilePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-popover',
  templateUrl: 'profile-popover.html',
})
export class ProfilePopoverPage {

  public authenticated = true;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public auth: AuthenticationService) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePopoverPage');
  }

  viewProfile() {

  }

  close() {
    this.viewCtrl.dismiss();
  }

}
