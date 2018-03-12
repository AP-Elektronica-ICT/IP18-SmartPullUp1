import { NgModule } from '@angular/core';
import { SpubNavbarComponent } from './spub-navbar/spub-navbar';
import { LoginComponent } from './login/login';
@NgModule({
	declarations: [SpubNavbarComponent,
    LoginComponent],
	imports: [],
	exports: [SpubNavbarComponent,
    LoginComponent]
})
export class ComponentsModule {}
