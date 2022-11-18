import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service'
import { ProfileService } from 'src/app/service/profile.service';
import { ProfileUserModel } from 'src/app/model/profile.user.model'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateEmailComponent } from 'src/app/popup/profile/updateEmail.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  //Compteur pour eviter bug de realod du ngOnInit
  cptNgOnInitReload:number = 0; //Nous l'initialisons à 0

  profileUser = {} as ProfileUserModel;

  constructor(
    private loginComponent:AuthService,
    private dialog: MatDialog,
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
      localStorage.setItem('userId',response.id.toString());
    });
    return 200;
  }

  setEmail(){
    //console.log(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    let dialogRef = this.dialog.open(UpdateEmailComponent, dialogConfig);
    
    //Si le compteur est inférieur à 1
    if(this.cptNgOnInitReload < 1){
      this.dialog.afterAllClosed.subscribe(() => {
        this.ngOnInit();
      });
      //Nous incémentons le compteur de 1 pour éviter de relancer le ngOnInit()
      this.cptNgOnInitReload = this.cptNgOnInitReload+1;
    }
  }

  logout(){
    this.loginComponent.logout();
    document.location.href = "/login";
  }

}
