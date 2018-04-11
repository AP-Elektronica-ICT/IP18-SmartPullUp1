import { Component, Input } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PopoverLoginComponent } from '../popover-login/popover-login';
import { StatusBar } from '@ionic-native/status-bar';

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

  constructor(private popoverCtrl: PopoverController, private statusBar: StatusBar) {
    
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#344AF7');
  }
  

  profileClicked(event) {
    let popover = this.popoverCtrl.create(PopoverLoginComponent);
    popover.present({
      ev: event
    });
  }

}
