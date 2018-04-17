import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { ApiService } from '../../services/ApiService';
import { Session } from 'selenium-webdriver';
import { ProgressSessionPage } from '../progress-session/progress-session';


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
  user: any;

  items = ['test', 'test1','test2','test3','test4'];
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService, private api: ApiService, private modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressPage');
    this.loadProfile();
  }



  public listClicked(item){
    let modal = this.modalController.create(ProgressSessionPage,{ClickedSession:"1523972515"});
    modal.present();
  }


  public loadProfile() {
    if (this.auth.isAuthenticated()) {
      let userId = this.auth.user.sub;

      this.api.getUserById(userId).then(data => {
        this.user = data;
        
        this.items.push("dis  " + this.user.name);
      });
      
    }
  }
}