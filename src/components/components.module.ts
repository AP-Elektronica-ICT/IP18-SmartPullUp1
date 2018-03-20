import { NgModule } from '@angular/core';
import { SpubNavbarComponent } from './spub-navbar/spub-navbar';
import { LoginComponent } from './login/login';
import { PopoverLoginComponent } from './popover-login/popover-login';
import { BluetoothDeviceComponent } from './bluetooth-device/bluetooth-device';
@NgModule({
	declarations: [SpubNavbarComponent,
    LoginComponent,
    PopoverLoginComponent,
    BluetoothDeviceComponent],
	imports: [],
	exports: [SpubNavbarComponent,
    LoginComponent,
    PopoverLoginComponent,
    BluetoothDeviceComponent]
})
export class ComponentsModule {}
