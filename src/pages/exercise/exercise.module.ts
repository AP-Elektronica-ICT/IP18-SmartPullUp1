import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercisePage } from './exercise';
import { SpubNavbarComponent } from '../../components/spub-navbar/spub-navbar';

@NgModule({
  declarations: [
    ExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(ExercisePage),
  ],
})
export class ExercisePageModule {}
