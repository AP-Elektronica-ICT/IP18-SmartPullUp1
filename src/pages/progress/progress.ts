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
  i =0;

  items = ['test', 'test1','test2','test3','test4'];
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService, private api: ApiService, private modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressPage');
    this.loadProfile();
  }

  ionViewWillEnter() {
    this.loadProfile();
  }


  public listClicked(item){
    let modal = this.modalController.create(ProgressSessionPage,{ClickedSession: item});
    modal.present();
  }


  public loadProfile() {
    console.log("Works")
    
      let userId = "google-oauth2|116967247859714699456";

      this.api.getUserById(userId).then(data => {
        this.user = data;
        console.log(data);
      });
  }
}