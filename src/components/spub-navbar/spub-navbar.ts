import { Component, Input } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PopoverLoginComponent } from '../popover-login/popover-login';

/**
 * Generated class for the SpubNavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'spub-navbar',
  templateUrl: 'spub-navbar.html'
})
export class SpubNavbarComponent {

  @Input() pageTitle;

  constructor(private popoverCtrl: PopoverController) {

  }

  profileClicked(event) {
    let popover = this.popoverCtrl.create(PopoverLoginComponent);
    popover.present({
      ev: event
    });
  }

}
