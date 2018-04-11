import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BluetoothConnectPage } from './bluetooth-connect';

@NgModule({
  declarations: [
    BluetoothConnectPage,
  ],
  imports: [
    IonicPageModule.forChild(BluetoothConnectPage),
  ],
})
export class BluetoothConnectPageModule {}
