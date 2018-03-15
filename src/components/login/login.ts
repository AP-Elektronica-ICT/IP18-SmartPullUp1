import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/AuthenticationService';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  constructor(private auth: AuthenticationService) {
    console.log('Init login component');

  }

}
