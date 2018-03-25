import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { ApiService, IUser } from '../../services/ApiService';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

  user : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationService, private api : ApiService) {
    // this.api.getUserById('test').subscribe( result => {
    //   this.setuser(result);
    //   //this.user = result;
    //   //console.log(this.user.userid);
    // });
    // console.log(this.user.userid);
  }

  ngOnInit(){
    this.api.getUserById('test').then(data => {
      this.user = data;
      console.log(this.user);
  });
    console.log(this.user);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
