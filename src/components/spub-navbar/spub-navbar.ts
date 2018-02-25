import { Component, Input } from '@angular/core';

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

  constructor() {

  }

}
