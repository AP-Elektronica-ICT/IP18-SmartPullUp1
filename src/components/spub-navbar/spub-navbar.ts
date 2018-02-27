import { Component, Input } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { ProfilePopoverPage } from '../../pages/profile-popover/profile-popover';

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
export class SpubNavbarComponent{

  @Input () pageTitle;

  constructor(public popoverCtrl: PopoverController) {

  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(ProfilePopoverPage);
    popover.present({
      ev: event
    });
  }

}
