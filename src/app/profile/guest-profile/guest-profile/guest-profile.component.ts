import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.scss']
})
export class GuestProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
  }
  login() {
    this.profileService.login();
  }

}
