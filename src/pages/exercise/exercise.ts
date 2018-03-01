import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExercisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage {
  counter = 0;
  Pullups = "pull ups";
  public PageTitle = 'Exercise';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
  }

  profileClicked() {
    console.log("Profile clicked!");
  }

  public Clicked() {

    this.counter ++;
   
    if(this.counter >= 10){

      this.Pullups = "Pull-up game is STRONG!"


    }
    if(this.counter >= 20){

      this.Pullups = "pull-up game is Fucking STRONG as FUCK!"

    }

  
}

}
