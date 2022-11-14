import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service'
import { ProfileService } from 'src/app/service/profile.service';
import { ProfileUserModel } from 'src/app/model/profile.user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileUser = {} as ProfileUserModel;

  constructor(
    private loginComponent:AuthService,
    private profileService:ProfileService, 
  ) { }

  ngOnInit() {
    //await this.getUser();
    setTimeout(() => {
    }, this.getUser());
  }

  ngAfterViewInit() {
  }


  

  getUser():number {
    this.profileService.getUser().subscribe((response: ProfileUserModel) => {
      this.profileUser = response;
    });
    return 200;
  }

  logout(){
    this.loginComponent.logout();
    document.location.href = "/login";
  }

}
