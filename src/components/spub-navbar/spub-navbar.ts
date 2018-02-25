import { Component } from '@angular/core';
import { Navbar } from 'ionic-angular';

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

  text: string;

  constructor() {
    console.log('Hello SpubNavbarComponent Component');
    this.text = 'Hello World';
  }

}
