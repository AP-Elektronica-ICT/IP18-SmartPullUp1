import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { ProfilePage } from '../../pages/profile/profile';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the PopoverLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-login',
  templateUrl: 'popover-login.html'
})
export class PopoverLoginComponent {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, private auth: AuthenticationService) {}

  navProfile() {
    this.close();
  }
  close() {
    this.viewCtrl.dismiss();
  }
  login() {
    this.close();
    this.auth.login();
  }
  logout() {
    this.close();
    this.auth.logout();
  }

}
