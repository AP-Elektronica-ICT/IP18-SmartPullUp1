import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';

/**
 * Generated class for the ProgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressPage');
  }

}
