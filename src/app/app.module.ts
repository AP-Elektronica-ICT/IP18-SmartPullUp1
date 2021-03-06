import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProgressPage } from '../pages/progress/progress';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiService } from '../services/ApiService';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../services/AuthenticationService';
import { JsonService } from '../services/JsonService';

import { ExercisePage } from '../pages/exercise/exercise';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { SchedulePage } from '../pages/schedule/schedule';
import { RegistrationPage } from '../pages/registration/registration';
import { SpubNavbarComponent } from '../components/spub-navbar/spub-navbar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothService } from '../services/BluetoothService';
import { BLE } from '@ionic-native/ble';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { LoginComponent } from '../components/login/login';
import { PopoverLoginComponent } from '../components/popover-login/popover-login';
import { BluetoothConnectPage } from '../pages/bluetooth-connect/bluetooth-connect';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ProgressSessionPage } from '../pages/progress-session/progress-session';
import { Facebook } from '@ionic-native/facebook';


@NgModule({
  declarations: [
    MyApp,
    ProgressPage,
    ProgressSessionPage,
    ExercisePage,
    ProfilePage,
    FriendsPage,
    SchedulePage,
    RegistrationPage,
    SpubNavbarComponent,
    PopoverLoginComponent,
    LoginComponent,
    BluetoothConnectPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
    ProgressSessionPage,
    ExercisePage,
    ProfilePage,
    FriendsPage,
    SchedulePage,
    RegistrationPage,
    SpubNavbarComponent,
    PopoverLoginComponent,
    LoginComponent,
    BluetoothConnectPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    BluetoothSerial,
    BluetoothService,
    BLE,
    JsonService,
    ApiService,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
