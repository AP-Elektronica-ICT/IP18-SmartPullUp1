import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CalendarModule } from 'ionic3-calendar-en';
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


@NgModule({
  declarations: [
    MyApp,
    ProgressPage,
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
    CalendarModule,
    IonicModule.forRoot(MyApp)
    NgCircleProgressModule.forRoot({})
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
