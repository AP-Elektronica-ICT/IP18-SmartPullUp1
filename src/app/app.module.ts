import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProgressPage } from '../pages/progress/progress';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationService } from '../services/AuthenticationService';
import { ExercisePage } from '../pages/exercise/exercise';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { SchedulePage } from '../pages/schedule/schedule';
import { SpubNavbarComponent } from '../components/spub-navbar/spub-navbar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothService } from '../services/BluetoothService';
import { BLE } from '@ionic-native/ble';

@NgModule({
  declarations: [
    MyApp,
    ProgressPage,
    ExercisePage,
    ProfilePage,
    FriendsPage,
    SchedulePage,
    SpubNavbarComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
    ExercisePage,
    ProfilePage,
    FriendsPage,
    SchedulePage,
    SpubNavbarComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    BluetoothSerial,
    BluetoothService,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
