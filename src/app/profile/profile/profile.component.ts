import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProfileHostDirective } from '../../profile-host.directive';
import { ProfileService } from '../../profile.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
// All we are doing here is creating a simple ng-template in which we attach the ProfileHostDirective,
//  so we can use the ViewChild decorator, and get the viewContainerRef. OnInit we are getting the viewContainerRef,
//  and using the isLoggedIn$ observable from ProfileService to know everytime the isLoggedIn state changes.
//  Then, using the mergeMap operator, I call the loadComponent function that is doing the real magic.
export class ProfileComponent implements OnInit {
  @ViewChild(ProfileHostDirective, { static: true })
  profileHost!: ProfileHostDirective;
  private destroySubject = new Subject();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const viewContainerRef = this.profileHost.viewContainerRef;

    this.profileService.isLoggedIn$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap(isLoggedIn =>
          this.profileService.loadComponent(viewContainerRef, isLoggedIn)
        )
      )
      .subscribe();
  }
  // ngOnDestroy() {
  //   this.destroySubject.next();
  //   this.destroySubject.complete();
  // }

}
