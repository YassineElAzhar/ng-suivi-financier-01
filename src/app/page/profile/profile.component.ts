import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service'

@Component({
  selector: 'app-profile',
  template: `
    <p>
      profile works!<br>
      <button (click)="logout()">Se deconnecter</button>
    </p>
  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  constructor(
    private loginComponent:AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginComponent.logout();
    document.location.href = "/login";
  }

}
