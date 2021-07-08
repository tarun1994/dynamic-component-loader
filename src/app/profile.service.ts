import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
 // This service is way easier to understand.
  //  We created a Subject to manage the isLoggedIn state, and two methods to many events into the subject.
  //  We created two private methods that return a function that returns a Promise of a Component.
export class ProfileService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  constructor(private appService: AppService) { }

 
  private guestProfile() {
    return () =>
    import('./profile/guest-profile/guest-profile/guest-profile.component').then(
      m => m.GuestProfileComponent
    );
  }
  private clientProfile() {
    return () =>
      import('./client-profile/client-profile.component').then(
        m => m.ClientProfileComponent
      );
  }
  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }
  loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    vcr.clear();

    return this.appService.forChild(vcr, {
      loadChildren: isLoggedIn ? this.clientProfile() : this.guestProfile()
    });
  }
}
