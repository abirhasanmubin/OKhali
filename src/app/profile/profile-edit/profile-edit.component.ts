import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: User;
  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.profileForm = new FormGroup({
      'name': new FormControl(this.user.userFullName),
      'contact': new FormControl(this.user.userContactNo),
    })
  }

  onSubmit() {
    let name = this.profileForm.value['name'];
    let contact = this.profileForm.value['contact'];
    this.user.userFullName = name;
    this.user.userContactNo = contact;
    localStorage.setItem('userData', JSON.stringify(this.user));
    this.userService.updateUser(this.user.userId, this.user);
    this.router.navigate(['/profile']);
    this.profileForm.reset();
  }

}
