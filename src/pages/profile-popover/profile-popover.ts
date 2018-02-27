import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


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

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
