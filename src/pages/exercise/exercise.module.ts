import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercisePage } from './exercise';
import { HttpClientModule, HttpClient } from '@angular/common/http';






@NgModule({
  declarations: [
    ExercisePage,
    

  ],
  imports: [
    IonicPageModule.forChild(ExercisePage),
    HttpClientModule,

  ],
})
export class ExercisePageModule {}


