import { Component } from '@angular/core';

import { ProgressPage } from '../progress/progress';
import { SchedulePage } from '../schedule/schedule';
import { ExercisePage } from '../exercise/exercise';
import { FriendsPage } from '../friends/friends';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProgressPage;
  tab2Root = SchedulePage;
  tab3Root = ExercisePage
  tab4Root = FriendsPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
