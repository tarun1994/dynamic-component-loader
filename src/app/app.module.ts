import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfileHostDirective } from './profile-host.directive';
import { ProfileComponent } from './profile/profile/profile.component';
import { GuestProfileComponent } from './profile/guest-profile/guest-profile/guest-profile.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileHostDirective,
    ProfileComponent,
    GuestProfileComponent,
    ClientProfileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
