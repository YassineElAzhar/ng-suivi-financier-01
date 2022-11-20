import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CalendarService } from 'src/app/service/calendar.service';
import { ProfileUserModel } from 'src/app/model/profile.user.model';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-updateEmail',
  templateUrl: './updateEmail.component.html',
  styleUrls: ['./updateEmail.component.scss']
})
export class UpdateEmailComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  profileUserModel: ProfileUserModel;
  isDifferent:boolean = false;
  equalCurrentEmail:boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private profileService:ProfileService,
    public dialogRef: MatDialogRef<UpdateEmailComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      currentEmail: [null, [Validators.required, Validators.minLength(10), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      newEmail: [null, [Validators.required, Validators.minLength(10), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      newEmailConfirm: [null, [Validators.required, Validators.minLength(10), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
    this.isDifferent = false;
    this.equalCurrentEmail = false;
  }

  updateEmailRequest() {
    if(this.form.controls["newEmail"].value !== this.form.controls["newEmailConfirm"].value){
      this.isDifferent = true;
      this.equalCurrentEmail = false;
    } else if(this.form.controls["currentEmail"].value === this.form.controls["newEmailConfirm"].value){
      this.equalCurrentEmail = true;
      this.isDifferent = false;
    }
    else {
      this.profileService.updateEmail(this.form.controls["newEmail"].value,this.form.controls["currentEmail"].value).subscribe((response:string) => {
        console.log(response)
      });
      this.equalCurrentEmail = false;
      this.isDifferent = false;
      this.form.reset();
      this.dialogRef.close();
    }
  }

}
