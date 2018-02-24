import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public AppName: string = 'Smart Pull-Up Bar';

  constructor(public navCtrl: NavController, private auth: AuthenticationService) {

  }

  ionViewDidEnter() {
    if(!this.auth.isAuthenticated){
      //this.auth.login();
    }
  }

}
