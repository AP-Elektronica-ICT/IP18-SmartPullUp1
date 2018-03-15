import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';

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

  constructor(public viewCtrl: ViewController, private auth: AuthenticationService) {}

  close() {
    this.viewCtrl.dismiss();
  }

}
