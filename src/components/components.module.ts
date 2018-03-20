import { NgModule } from '@angular/core';
import { SpubNavbarComponent } from './spub-navbar/spub-navbar';
import { LoginComponent } from './login/login';
import { PopoverLoginComponent } from './popover-login/popover-login';
@NgModule({
	declarations: [SpubNavbarComponent,
    LoginComponent,
    PopoverLoginComponent],
	imports: [],
	exports: [SpubNavbarComponent,
    LoginComponent,
    PopoverLoginComponent]
})
export class ComponentsModule {}
