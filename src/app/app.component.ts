import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginComponent } from './page/login/login.component'
import { ProfileService } from './service/profile.service';
import { ProfileUserModel } from './model/profile.user.model';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  @ViewChild(LoginComponent) loginComponent: LoginComponent;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private profileService:ProfileService) {
    this.setUserDataDisplayed();
  };
  
  isLoggedIn:boolean = localStorage.getItem("isLoggedIn") == "true";
  urlProfilePicture:string = "";
  userNom:string = "";
  userPrenom:string = "";
  userTypeProfile:string = "";

  ngAfterViewInit() {
    if(this.isLoggedIn){
      this.observer.observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  
      this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over'){
          this.sidenav.close();
        }
      });
    }
  }

  setUserDataDisplayed(){
    this.profileService.getUser().subscribe((response: ProfileUserModel) => {
      this.urlProfilePicture = response.pictureUrl;
      this.userNom = response.nom;
      this.userPrenom = response.prenom;
      this.userTypeProfile = response.typeProfil;
      localStorage.setItem("userId", response.id.toString());
    });
  }


}
